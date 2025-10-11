package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctor.AccountDoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorLiteDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorWorkDTO;
import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.dto.schedule.ScheduleDTO;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.payload.request.doctor.DoctorUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> getDoctors();
    List<DoctorLiteDTO> getDoctorsBySpecialty(Integer specialtyID);
    List<DoctorLiteDTO> getDoctorsLite();
    Long countDoctor();
    DoctorDTO updateDoctor(String username, DoctorRequest doctorRequest);
    List<DoctorDTO> importDoctor(MultipartFile file);


    List<DoctorWorkDTO> getDoctorsWithAvailableSlotsBySpecialty(Integer specialtyId);

    DoctorDTO getByUsername(String username);
    void updateImageDoctor(String username, MultipartFile image);
    void updateInforDoctor(String username, DoctorUpdateRequest request);
    List<ScheduleDTO> getScheduleByUsernameDoctor(String Username);
}
