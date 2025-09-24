package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.account.AccountMapper;
import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.dto.doctor.AccountDoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.patient.AccountPatientDTO;
import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.dto.patient.PatientMapper;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.Drug;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.dto.account.RegisterDTO;
import com.nln.hospitalsystem.payload.request.doctor.AccountDoctorRequest;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.payload.request.patient.AccountPatientRequest;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.repository.PatientRepository;
import com.nln.hospitalsystem.repository.SpecialtyRepository;
import com.nln.hospitalsystem.service.AccountService;
import com.nln.hospitalsystem.entity.Account;
import com.nln.hospitalsystem.repository.AccountRepository;
import com.nln.hospitalsystem.service.FileService;
import com.nln.hospitalsystem.utils.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    SpecialtyRepository specialtyRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private FileService fileService;


    @Override
    public List<AccountDTO> getAllUsers() {
        List<Account> listAccount = accountRepository.findAll();
        return listAccount.stream()
                .map(AccountMapper::toDTO)
                .collect(Collectors.toList());
    }

//
//    @Override
//    public boolean checkLogin(String username, String password) {
//        List<Account> listAccount = accountRespository.findByUsernameAndPasswordHash(username, password);
//
//        if (listAccount.size() > 0) {
//            return true;
//        }
//        return false;
//    }

    @Override
    public RegisterDTO register(RegisterRequest registerRequest) {
        try {
            // Validate input
            if (registerRequest.getUsername() == null || registerRequest.getPassword() == null) {
                throw new IllegalArgumentException("Username or password is null");
            }
            if (accountRepository.existsByUsername(registerRequest.getUsername())) {
                throw new IllegalStateException("Username already exists");
            }

            // Tạo account
            Account account = Account.builder()
                    .username(registerRequest.getUsername())
                    .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Account.Role.PATIENT)
                    .build();

            Account savedAccount = accountRepository.save(account);

            // Tạo patient gắn với account
            Patient patient = Patient.builder()
                    .account(savedAccount)
                    .build();
            patientRepository.save(patient);

            // Trả về response
            return new RegisterDTO(
                    savedAccount.getId(),
                    savedAccount.getUsername(),
                    savedAccount.getRole().name()
            );

        } catch (IllegalArgumentException | IllegalStateException e) {
            // Lỗi do người dùng (input không hợp lệ, trùng username, ...)
            throw e;  // ném lên controller để map sang HTTP 400/409
        } catch (Exception e) {
            // Lỗi hệ thống (DB, null pointer, ...)
            throw new RuntimeException("Register failed: " + e.getMessage(), e);
        }
    }



    @Override
    public LoginDTO login(LoginRequest loginRequest) {
//        System.out.println(loginRequest.getUsername());
        Account account = accountRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

//        System.out.println("passowrd: " + loginRequest.getPassword());
//        System.out.println("passowrdHash: " + passwordEncoder.matches(loginRequest.getPassword(), account.getPasswordHash()));
        if (!passwordEncoder.matches(loginRequest.getPassword(), account.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = jwtUtils.generateToken(account.getUsername(), account.getRole().name());
//        System.out.println("token: " + token);
        return new LoginDTO(account.getUsername(), account.getRole().name(), token);
    }

    @Override
    public Long countUsers() {
        return accountRepository.count();
    }

    @Override
    public AccountDoctorDTO registerDoctor(AccountDoctorRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Username or password is null");
        }

        if (accountRepository.existsByUsername(request.getUsername())) {
            throw new IllegalStateException("Username already exists");
        }

        Account acc = Account.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Account.Role.DOCTOR)
                .build();

        Account savedAccount = accountRepository.save(acc);

        Doctor doctor = Doctor.builder()
                .account(savedAccount)
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .birthDay(request.getBirthDay())
                .gender(request.getGender())
                .degree(request.getDegree())
                .position(request.getPosition())
                .yearsOfExperience(request.getYearsOfExperience())
                .licenseNumber(request.getLicenseNumber())
                .consultationFee(request.getConsultationFee())
                .workingHours(request.getWorkingHours())
                .build();

        doctor.setSpecialty(
                specialtyRepository.findById(request.getSpecialtyId())
                        .orElseThrow(() -> new EntityNotFoundException("Specialty not found"))
        );


        handleUploadImageDoctor(request.getImage(), doctor);

        Doctor savedDoctor = doctorRepository.save(doctor);
        DoctorDTO doctorDTO = DoctorMapper.toDTO(savedDoctor);

        return AccountDoctorDTO.builder()
                .id(savedAccount.getId())
                .username(savedAccount.getUsername())
                .role(savedAccount.getRole().name())
                .createdAt(savedAccount.getCreatedAt())
                .updatedAt(savedAccount.getUpdatedAt())
                .doctor(doctorDTO)
                .build();
    }

    @Override
    public AccountPatientDTO registerPatient(AccountPatientRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Username or password is null");
        }

        if (accountRepository.existsByUsername(request.getUsername())) {
            throw new IllegalStateException("Username already exists");
        }

        Account acc = Account.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Account.Role.DOCTOR)
                .build();

        Account savedAccount = accountRepository.save(acc);

        Patient patient = Patient.builder()
                .account(savedAccount)
                .name(request.getName())
                .birthDate(request.getBirthDate())
                .address(request.getAddress())
                .gender(request.getGender())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();

        handleUploadImagePatient(request.getImage(), patient);

        Patient savedPatient = patientRepository.save(patient);
        PatientDTO dto = PatientMapper.toDTO(savedPatient);

        return AccountPatientDTO.builder()
                .id(savedAccount.getId())
                .username(savedAccount.getUsername())
                .role(savedAccount.getRole().name())
                .createdAt(savedAccount.getCreatedAt())
                .updatedAt(savedAccount.getUpdatedAt())
                .patient(dto)
                .build();
    }


    private void handleUploadImagePatient(MultipartFile image, Patient patient) {
        if (image == null || image.isEmpty()) return;

        String fileName = fileService.createNameFile(image);
        fileService.saveFile(image, fileName, FileCategory.DRUG);
        patient.setImageUrl(fileName);
    }

    private void handleUploadImageDoctor(MultipartFile image, Doctor doctor) {
        if (image == null || image.isEmpty()) return;

        String fileName = fileService.createNameFile(image);
        fileService.saveFile(image, fileName, FileCategory.DRUG);
        doctor.setImageUrl(fileName);
    }


}
