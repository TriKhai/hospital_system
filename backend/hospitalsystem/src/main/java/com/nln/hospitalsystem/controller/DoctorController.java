package com.nln.hospitalsystem.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // return string
@RequestMapping("/doctor") // dang ky url
public class DoctorController {

    @GetMapping("/getAll")
    public String getAll() {
        return "hello";
    }

    // Tham so
    @GetMapping("/getByID/{id}")
    public String getByID(@PathVariable("id") int id) {
        return "hello " + id;
    }

    // Tham so dang form-data
    @GetMapping("/requestParam")
    public String requestParam(@RequestParam("username") String username, @RequestParam("password") String password) {
        return "hello " + username + " " + password;
    }

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
