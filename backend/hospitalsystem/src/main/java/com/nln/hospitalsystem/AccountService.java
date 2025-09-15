package com.nln.hospitalsystem;

import com.nln.hospitalsystem.dto.account.AccountDTO;

import java.util.List;

public interface AccountService {
    List<AccountDTO> getAllUsers();
    boolean checkLogin(String username, String password);
}
