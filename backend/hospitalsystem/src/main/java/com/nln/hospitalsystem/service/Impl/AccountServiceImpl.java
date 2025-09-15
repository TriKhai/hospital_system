package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.AccountService;
import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.entity.Account;
import com.nln.hospitalsystem.repository.AccountRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRespository accountRespository;


    @Override
    public List<AccountDTO> getAllUsers() {
        List<Account> listAccount = accountRespository.findAll();
        List<AccountDTO> accounts = new ArrayList<>();

        for (Account account : listAccount) {

            AccountDTO accountDTO = new AccountDTO();

            accountDTO.setId(account.getId());
            accountDTO.setUsername(account.getUsername());
            accountDTO.setPasswordHash(account.getPasswordHash());
            accountDTO.setRole(account.getRole());
            accountDTO.setCreatedAt(account.getCreatedAt());
            accountDTO.setUpdatedAt(account.getUpdatedAt());

            accounts.add(accountDTO);
        }
        return accounts;
    }

    @Override
    public boolean checkLogin(String username, String password) {
        List<Account> listAccount = accountRespository.findByUsernameAndPasswordHash(username, password);

        if (listAccount.size() > 0) {
            return true;
        }
        return false;
    }


}
