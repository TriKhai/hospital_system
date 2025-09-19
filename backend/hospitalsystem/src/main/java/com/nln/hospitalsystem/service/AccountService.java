package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.dto.account.RegisterDTO;

public interface AccountService {
//    List<RegisterDTO> getAllUsers();
//    boolean checkLogin(String username, String password);
    RegisterDTO register(RegisterRequest registerRequest);
    RegisterDTO registerDoctor(RegisterRequest registerRequest);
    LoginDTO login(LoginRequest loginRequest);
}
