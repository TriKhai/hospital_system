package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.dto.account.RegisterDTO;

import java.util.List;

public interface AccountService {
    List<AccountDTO> getAllUsers();
//    boolean checkLogin(String username, String password);
    RegisterDTO register(RegisterRequest registerRequest);
    RegisterDTO registerDoctor(RegisterRequest registerRequest);
    LoginDTO login(LoginRequest loginRequest);
    Long countUsers();
}
