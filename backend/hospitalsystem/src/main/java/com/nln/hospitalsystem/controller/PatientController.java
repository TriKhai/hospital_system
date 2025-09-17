package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.patient.PatientRequest;
import com.nln.hospitalsystem.service.FileService;
import com.nln.hospitalsystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    FileService fileService;

    @Autowired
    PatientService patientService;

    @PutMapping("/profile")
    public ResponseEntity<ResponseData<PatientDTO>> updateProfile(
            @ModelAttribute PatientRequest patientRequest,
            Principal principal) {

        // principal.getName() mặc định chính là username
        String username = principal.getName();
        System.out.println("username : " + username);

        PatientDTO updated = patientService.updatePatient(username, patientRequest);

        return ResponseEntity.ok(ResponseData.success(updated, "Update profile successfully"));
    }

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PatientDTO>>> getAllPatients() {
        return ResponseEntity.ok(ResponseData.success(
                patientService.getAllPatients(),
                "Patients retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<PatientDTO>> getPatientById(@PathVariable Integer id) {
        PatientDTO patient = patientService.getPatientById(id);
        return ResponseEntity.ok(ResponseData.success(patient, "Get patient successfully"));
    }


// ===== Test uploadFile
//    @PostMapping("/upload-avatar")
//    public ResponseEntity<?> testUploadFile(@RequestParam MultipartFile file) {
//        try {
//            // Tạo tên file mới
//            String fileName = fileService.createNameFile(file);
//
//            // Lưu file vào thư mục patient
//            fileService.saveFile(file, fileName, FileCategory.PATIENT);
//
//            // Trả về tên file (hoặc URL truy cập)
//            return ResponseEntity.ok("Upload thành công: " + fileName);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Upload thất bại: " + e.getMessage());
//        }
//    }
//
//    // Load avatar
//    @GetMapping("/avatar/{fileName}")
//    public ResponseEntity<?> getAvatar(@PathVariable String fileName) {
//        try {
//            Resource resource = fileService.loadFile(fileName, FileCategory.PATIENT);
//            String contentType = Files.probeContentType(resource.getFile().toPath());
//            return ResponseEntity.ok()
//                    .contentType(MediaType.parseMediaType(contentType))
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//        } catch (Exception e) {
//            System.out.println(e);
//            return ResponseEntity.badRequest().body("Không thể tải file: " + e.getMessage());
//        }
//    }
//
//    // Xoá avatar
//    @DeleteMapping("/avatar/{fileName}")
//    public ResponseEntity<?> deleteAvatar(@PathVariable String fileName) {
//        try {
//            boolean deleted = fileService.deleteFile(fileName, FileCategory.PATIENT);
//            if (deleted) {
//                return ResponseEntity.ok("Xoá file thành công: " + fileName);
//            } else {
//                return ResponseEntity.badRequest().body("File không tồn tại: " + fileName);
//            }
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Xoá thất bại: " + e.getMessage());
//        }
//    }
}
