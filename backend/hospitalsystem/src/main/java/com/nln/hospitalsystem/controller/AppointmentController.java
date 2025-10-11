package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;
import com.nln.hospitalsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody AppointmentRequest request) {
        appointmentService.createAppointment(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAll() {
        List<AppointmentDTO> dto = appointmentService.getAll();
        return ResponseEntity.ok(ResponseData.success(dto, "Get appointments successfully"));
    }

    @GetMapping("/patient")
    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getByPatient(Authentication authentication) {
        List<AppointmentDTO> dto = appointmentService.getByUsernamePatient(authentication.getName());
        return ResponseEntity.ok(ResponseData.success(dto, "Get appointments successfully"));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ResponseData<List<Void>>> updateStatus(@PathVariable Integer id, @RequestBody AppointmentStatus status) {
        appointmentService.updateStatus(id, status);
        return ResponseEntity.ok(ResponseData.success(null, "update status successfully"));
    }

    @PatchMapping("/{id}/cancel-by-patient")
    public ResponseEntity<ResponseData<List<Void>>> cancelByPatient(@PathVariable Integer id) {
        appointmentService.cancelByPatient(id);
        return ResponseEntity.ok(ResponseData.success(null, "update status successfully"));
    }

}
