package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.dto.account.RegisterDTO;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.service.AccountService;
import com.nln.hospitalsystem.payload.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AccountService accountService;

//    @PostMapping("/check-account")
//    public ResponseEntity <ResponseData<String>> checkAccount(@RequestParam String username, @RequestParam String password) {
//
//        boolean exists = accountService.checkLogin(username, password);
//
//        if (exists) {
//            return ResponseEntity.ok(ResponseData.success(null, "Account exists"));
//        }
//        return ResponseEntity.ok(ResponseData.error(401, "Invalid credentials"));
//    }

    @PostMapping("/register")
    public ResponseEntity<ResponseData<RegisterDTO>> register(@RequestBody RegisterRequest registerRequest) {
        try {
            RegisterDTO savedAccount = accountService.register(registerRequest);

            return ResponseEntity.ok(
                    ResponseData.success(savedAccount, "Register successfully")
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ResponseData.error(400, e.getMessage()));

        } catch (IllegalStateException e) {
            return ResponseEntity.status(409)
                    .body(ResponseData.error(409, e.getMessage()));

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ResponseData.error(500, "Internal server error"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseData<LoginDTO>> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginDTO response = accountService.login(loginRequest);
            return ResponseEntity.ok(ResponseData.success(response, "Login successful"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseData.error(400, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ResponseData.error(500, "Internal server error"));
        }

    }



}
