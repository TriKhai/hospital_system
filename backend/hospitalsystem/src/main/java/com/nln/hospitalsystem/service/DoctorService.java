package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctor.AccountDoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorLiteDTO;
import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> getDoctors();
    List<DoctorLiteDTO> getDoctorsBySpecialty(Integer specialtyID);
    List<DoctorLiteDTO> getDoctorsLite();
    Long countDoctor();
    DoctorDTO updateDoctor(String username, DoctorRequest doctorRequest);
    List<DoctorDTO> importDoctor(MultipartFile file);
}
