package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.dto.doctor.AccountDoctorDTO;
import com.nln.hospitalsystem.dto.patient.AccountPatientDTO;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.dto.account.RegisterDTO;
import com.nln.hospitalsystem.payload.request.doctor.AccountDoctorRequest;
import com.nln.hospitalsystem.payload.request.doctor.DoctorRequest;
import com.nln.hospitalsystem.payload.request.patient.AccountPatientRequest;

import java.util.List;

public interface AccountService {
    List<AccountDTO> getAllUsers();
//    boolean checkLogin(String username, String password);
    RegisterDTO register(RegisterRequest registerRequest);
//    RegisterDTO registerDoctor(RegisterRequest registerRequest);
    LoginDTO login(LoginRequest loginRequest);
    Long countUsers();
    AccountDoctorDTO registerDoctor(AccountDoctorRequest request);
    AccountPatientDTO registerPatient(AccountPatientRequest request);
}
