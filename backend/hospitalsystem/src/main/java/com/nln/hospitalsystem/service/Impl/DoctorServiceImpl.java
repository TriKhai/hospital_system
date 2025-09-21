package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.account.AccountMapper;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.patient.PatientMapper;
import com.nln.hospitalsystem.entity.Account;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.service.DoctorService;
import com.nln.hospitalsystem.service.FileService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private FileService fileService;

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
            throw new RuntimeException("Error creating doctor: " + e.getMessage(), e);
        }
    }
}
