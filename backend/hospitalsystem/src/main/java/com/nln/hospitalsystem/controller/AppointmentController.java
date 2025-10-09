package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;
import com.nln.hospitalsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
