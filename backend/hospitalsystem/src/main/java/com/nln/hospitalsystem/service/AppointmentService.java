package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.payload.request.appointment.AppointmentRequest;

import java.util.List;

public interface AppointmentService {
    void createAppointment(AppointmentRequest request);
    List<AppointmentDTO> getAll();
    List<AppointmentDTO> getByUsernamePatient(String username);
    List<AppointmentDTO> getByUsernameDoctor(String username);
    void updateStatus(Integer id, AppointmentStatus status);
    void cancelByPatient(Integer id);
    void cancelByDoctor(Integer id);
    void confirmByDoctor(Integer id);
}
