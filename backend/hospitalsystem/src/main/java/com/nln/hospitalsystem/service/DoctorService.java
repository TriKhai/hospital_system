package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;

public interface DoctorService {
    DoctorDTO updateDoctor(String username, DoctorRequest doctorRequest);
}
