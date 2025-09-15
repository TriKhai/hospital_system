package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.AccountService;
import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.service.Impl.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity <?> login() {


        List<AccountDTO> accounts = new ArrayList<>();
        accounts = accountService.getAllUsers();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @PostMapping("/check-account")
    public ResponseEntity <ResponseData<String>> checkAccount(@RequestParam String username, @RequestParam String password) {

        boolean exists = accountService.checkLogin(username, password);

        if (exists) {
            return ResponseEntity.ok(ResponseData.success(null, "Account exists"));
        }
        return ResponseEntity.ok(ResponseData.error(401, "Invalid credentials"));
    }
}
