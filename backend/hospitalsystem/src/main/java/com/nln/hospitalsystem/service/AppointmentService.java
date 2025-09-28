package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;

public interface AppointmentService {
    void createAppointment(AppointmentRequest request);
}
