package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorLiteDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorWorkDTO;
import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController // return string
@RequestMapping("/doctor") // dang ky url
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @PutMapping("/profile")
    public ResponseEntity<ResponseData<DoctorDTO>> updateDoctor(
            @ModelAttribute DoctorRequest doctorRequest,
            Principal principal) {
        String username = principal.getName();
        System.out.println("username doctor: " + username);

        DoctorDTO updated = doctorService.updateDoctor(username, doctorRequest);

        return ResponseEntity.ok(ResponseData.success(updated, "Update profile successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<DoctorDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<DoctorDTO> result = doctorService.importDoctor(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<DoctorDTO>>> getAll() {
        List<DoctorDTO> accounts = doctorService.getDoctors();
        return ResponseEntity.ok(ResponseData.success(accounts, "Get doctors successfully"));
    }

    @GetMapping("/specialty")
    public ResponseEntity<ResponseData<List<DoctorLiteDTO>>> getAll(@RequestParam(required = false) Integer id) {
        List<DoctorLiteDTO> dto;
        if (id == null) {
            dto = doctorService.getDoctorsLite();
        } else {
            dto = doctorService.getDoctorsBySpecialty(id);
        }
        return ResponseEntity.ok(ResponseData.success(dto, "Get doctors successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = doctorService.countDoctor();
        return ResponseEntity.ok(ResponseData.success(count, "Count accounts successfully"));
    }

    @GetMapping("/doctor-work")
    public ResponseEntity<ResponseData<List<DoctorWorkDTO>>> getDoctorWork(@RequestParam(required = false) Integer id) {
        List<DoctorWorkDTO> dto = doctorService.getAllDoctorWorks(id);
        return ResponseEntity.ok(ResponseData.success(dto, "Get doctors successfully"));
    }

    // Tham so
//    @GetMapping("/getByID/{id}")
//    public String getByID(@PathVariable("id") int id) {
//        return "hello " + id;
//    }
//
//    // Tham so dang form-data
//    @GetMapping("/requestParam")
//    public String requestParam(@RequestParam("username") String username, @RequestParam("password") String password) {
//        return "hello " + username + " " + password;
//    }

    // Tham so dang json
//    @PostMapping("/requestBody")
//    public  String requestBody(@RequestBody Doctor doctor) {
//        return "hello " + doctor.getId();
//    }

//    @PostMapping("/list-requestBody")
//    public  String requestBody(@RequestBody List<Doctor> doctor) {
//        StringBuilder s = new StringBuilder();
//        for (Doctor doc : doctor) {
//            s.append(doc.getName());
//        }
//        return  "hello " + s;
//    }


}
