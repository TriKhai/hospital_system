package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<ResponseData<List<AccountDTO>>> getAll() {
        List<AccountDTO> accounts = accountService.getAllUsers();
        return ResponseEntity.ok(ResponseData.success(accounts, "Get accounts successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = accountService.countUsers();
        return ResponseEntity.ok(ResponseData.success(count, "Count accounts successfully"));
    }

}
