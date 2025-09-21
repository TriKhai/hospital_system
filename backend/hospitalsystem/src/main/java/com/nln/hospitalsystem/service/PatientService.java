package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.patient.PatientDTO;
import com.nln.hospitalsystem.payload.request.patient.PatientRequest;

import java.util.List;

public interface PatientService {
    PatientDTO updatePatient(String username, PatientRequest patientRequest);
    void deletePatient(Integer id);
    PatientDTO getPatientById(Integer id);
    List<PatientDTO> getAllPatients();
    Long countPatients();
}
