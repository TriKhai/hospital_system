package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<ResponseData<List<DoctorDTO>>> getAll() {
        List<DoctorDTO> accounts = doctorService.getDoctors();
        return ResponseEntity.ok(ResponseData.success(accounts, "Get doctors successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = doctorService.countDoctor();
        return ResponseEntity.ok(ResponseData.success(count, "Count accounts successfully"));
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
