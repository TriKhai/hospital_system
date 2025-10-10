package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.dto.patient.PatientMapper;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.request.patient.PatientRequest;
import com.nln.hospitalsystem.payload.request.patient.PatientUpdateRequest;
import com.nln.hospitalsystem.repository.PatientRepository;
import com.nln.hospitalsystem.service.FileService;
import com.nln.hospitalsystem.service.PatientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private FileService fileService;

    @Override
//    @PreAuthorize("hasRole('PATIENT') or #username == authentication.name")
    public PatientDTO updatePatient(String username, PatientRequest patientRequest) {
        try {
            Patient patient = patientRepository.findByAccount_Username(username)
                    .orElseThrow(() -> new EntityNotFoundException("Patient not found for username: " + username));

            // handle upload file
            MultipartFile image = patientRequest.getImage();
            if (image != null && !image.isEmpty()) {
                // Xóa ảnh cũ nếu có
                if (patient.getImageUrl() != null) {
                    String oldFileName = Path.of(patient.getImageUrl()).getFileName().toString();
                    fileService.deleteFile(oldFileName, FileCategory.PATIENT);
                }

                // Lưu ảnh mới
                String fileName = fileService.createNameFile(image);
                fileService.saveFile(image, fileName, FileCategory.PATIENT);
                System.out.println(fileName);
                patient.setImageUrl(fileName);
            }

            patient.setName(patientRequest.getName());
            patient.setBirthDate(patientRequest.getBirthDate());
            patient.setGender(patientRequest.getGender());
            patient.setAddress(patientRequest.getAddress());
            patient.setEmail(patientRequest.getEmail());
            patient.setPhone(patientRequest.getPhone());


            Patient savedPatient = patientRepository.save(patient);

            return PatientMapper.toDTO(patient);


        } catch (Exception e) {
            throw new RuntimeException("Error creating patient: " + e.getMessage(), e);
        }
    }

    @Override
    public void deletePatient(Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + id));

        if (patient.getImageUrl() != null) {
            try {
                // Lấy tên file từ imageUrl (chỉ phần cuối path)
                String fileName = Paths.get(patient.getImageUrl()).getFileName().toString();
                fileService.deleteFile(fileName, FileCategory.PATIENT);
            } catch (Exception e) {
                System.err.println("Failed to delete image: " + e.getMessage());
            }
        }

        patientRepository.delete(patient);
    }

    @Override
    public PatientDTO getPatientById(Integer id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + id));
        return PatientMapper.toDTO(patient);
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(PatientMapper::toDTO)   // gọi static method
                .toList();
    }

    @Override
    public Long countPatients() {
        return patientRepository.count();
    }

    @Override
    public PatientDTO getPatientByUsername(String username) {
        Patient patient = patientRepository.findByAccount_Username(username)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found for username: " + username));
        return PatientMapper.toDTO(patient);
    }

    @Override
    public void updateImagePatient(String username, MultipartFile image) {
        try {
            if (image == null || image.isEmpty()) {
                throw new IllegalArgumentException("Invalid image file");
            }

            Patient patient = patientRepository.findByAccount_Username(username)
                    .orElseThrow(() -> new EntityNotFoundException("Patient not found for username: " + username));

            if (patient.getImageUrl() != null) {
                String oldFileName = Path.of(patient.getImageUrl()).getFileName().toString();
                fileService.deleteFile(oldFileName, FileCategory.PATIENT);
            }

            String fileName = fileService.createNameFile(image);
            fileService.saveFile(image, fileName, FileCategory.PATIENT);

            patient.setImageUrl(fileName);
            patientRepository.save(patient);

        } catch (Exception e) {
            throw new RuntimeException("Error creating patient: " + e.getMessage(), e);
        }
    }

    @Override
    public void updateInforPatient(String username, PatientUpdateRequest request) {
        try {
            Patient patient = patientRepository.findByAccount_Username(username)
                    .orElseThrow(() -> new EntityNotFoundException("Patient not found for username: " + username));

            if (request.getName() != null) patient.setName(request.getName());
            if (request.getBirthDate() != null) patient.setBirthDate(request.getBirthDate());
            if (request.getGender() != null) patient.setGender(request.getGender());
            if (request.getAddress() != null) patient.setAddress(request.getAddress());
            if (request.getEmail() != null) patient.setEmail(request.getEmail());
            if (request.getPhone() != null) patient.setPhone(request.getPhone());

            patientRepository.save(patient);
        } catch (Exception e) {
            throw new RuntimeException("Error updating patient: " + e.getMessage(), e);
        }
    }

}
