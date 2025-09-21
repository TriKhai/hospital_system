package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> getDoctors();
    Long countDoctor();
    DoctorDTO updateDoctor(String username, DoctorRequest doctorRequest);
}
