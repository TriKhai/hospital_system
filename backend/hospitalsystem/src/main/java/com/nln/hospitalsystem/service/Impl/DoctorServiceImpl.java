package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.account.AccountMapper;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.drug.DrugMapper;
import com.nln.hospitalsystem.dto.patient.PatientMapper;
import com.nln.hospitalsystem.entity.*;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.repository.AccountRepository;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.repository.SpecialtyRepository;
import com.nln.hospitalsystem.service.DoctorService;
import com.nln.hospitalsystem.service.FileService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<DoctorDTO> getDoctors() {
        List<Doctor> listDoctor = doctorRepository.findAll();
        return listDoctor.stream()
                .map(DoctorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long countDoctor() {
        return doctorRepository.count();
    }


    @Override
    public DoctorDTO updateDoctor(String username, DoctorRequest doctorRequest) {
        try {
            Doctor doctor = doctorRepository.findByAccount_Username(username)
                    .orElseThrow(() -> new EntityNotFoundException("Doctor not found for username: " + username));

            // handle upload file
            MultipartFile image = doctorRequest.getImage();
            if (image != null && !image.isEmpty()) {
                System.out.println("hell0");
                // Xóa ảnh cũ nếu có
                if (doctor.getImageUrl() != null) {
                    System.out.println("Old image: " + doctor.getImageUrl());
                    String oldFileName = Path.of(doctor.getImageUrl()).getFileName().toString();
                    fileService.deleteFile(oldFileName, FileCategory.DOCTOR);
                }

                // Lưu ảnh mới
                String fileName = fileService.createNameFile(image);
                fileService.saveFile(image, fileName, FileCategory.DOCTOR);
                System.out.println(fileName);
                doctor.setImageUrl(fileName);
            }

            doctor.setName(doctorRequest.getName());
            doctor.setEmail(doctorRequest.getEmail());
            doctor.setPhone(doctorRequest.getPhone());
            doctor.setAddress(doctorRequest.getAddress());
            doctor.setGender(doctorRequest.getGender());
            doctor.setBirthDay(doctorRequest.getBirthDay());
            doctor.setConsultationFee(doctorRequest.getConsultationFee());
            doctor.setWorkingHours(doctorRequest.getWorkingHours());
            doctor.setLicenseNumber(doctorRequest.getLicenseNumber());
            doctor.setYearsOfExperience(doctorRequest.getYearsOfExperience());
            doctor.setDegree(doctorRequest.getDegree());
            doctor.setPosition(doctorRequest.getPosition());


            doctorRepository.save(doctor);

            return DoctorMapper.toDTO(doctor);


        } catch (Exception e) {
            throw new RuntimeException("Error editing doctor: " + e.getMessage(), e);
        }
    }

    @Override
    public List<DoctorDTO> importDoctor(MultipartFile file) {
        List<Doctor> doctors = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Specialty specialty = specialtyRepository.findById(
                                Integer.parseInt(record.get("specialtyId")))
                        .orElseThrow(() -> new RuntimeException(
                                "Specialty ID " + record.get("specialtyId") + " not found"));

                if (record.get("username") == null || record.get("password") == null) {
                    throw new IllegalArgumentException("Username or password is null");
                }

                if (accountRepository.existsByUsername(record.get("username"))) {
                    throw new IllegalStateException("Username already exists");
                }

                Account acc = Account.builder()
                        .username(record.get("username"))
                        .passwordHash(passwordEncoder.encode(record.get("password")))
                        .role(Account.Role.DOCTOR)
                        .build();

                Account savedAccount = accountRepository.save(acc);

                Doctor doctor = Doctor.builder()
                        .account(savedAccount)
                        .name(record.get("name"))
                        .email(record.get("email"))
                        .phone(record.get("phone"))
                        .address(record.get("address"))
                        .birthDay(LocalDate.parse(record.get("birthDay")))
                        .gender(Boolean.parseBoolean(record.get("gender"))) // true = male, false = female
                        .imageUrl(null) // CSV không import ảnh
                        .consultationFee(new BigDecimal(record.get("consultationFee")))
                        .workingHours(LocalTime.parse(record.get("workingHours")))
                        .licenseNumber(record.get("licenseNumber"))
                        .yearsOfExperience(Integer.parseInt(record.get("yearsOfExperience")))
                        .degree(record.get("degree"))
                        .position(record.get("position"))
                        .specialty(specialty)
                        .build();

                doctors.add(doctor);
            }

            return doctorRepository.saveAll(doctors)
                    .stream()
                    .map(DoctorMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage(), e);
        }
    }
}
