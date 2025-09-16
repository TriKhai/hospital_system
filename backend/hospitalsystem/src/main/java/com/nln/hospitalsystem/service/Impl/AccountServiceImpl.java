package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.account.AccountDTO;
import com.nln.hospitalsystem.dto.account.LoginDTO;
import com.nln.hospitalsystem.entity.Patient;
import com.nln.hospitalsystem.payload.request.LoginRequest;
import com.nln.hospitalsystem.payload.request.RegisterRequest;
import com.nln.hospitalsystem.dto.account.RegisterDTO;
import com.nln.hospitalsystem.repository.PatientRepository;
import com.nln.hospitalsystem.service.AccountService;
import com.nln.hospitalsystem.entity.Account;
import com.nln.hospitalsystem.repository.AccountRespository;
import com.nln.hospitalsystem.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRespository accountRespository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;


//    @Override
//    public List<RegisterDTO> getAllUsers() {
//        List<Account> listAccount = accountRespository.findAll();
//        List<RegisterDTO> accounts = new ArrayList<>();
//
//        for (Account account : listAccount) {
//
//            RegisterDTO accountDTO = new RegisterDTO();
//
//            accountDTO.setId(account.getId());
//            accountDTO.setUsername(account.getUsername());
//            accountDTO.setPasswordHash(account.getPasswordHash());
//            accountDTO.setRole(account.getRole());
//            accountDTO.setCreatedAt(account.getCreatedAt());
//            accountDTO.setUpdatedAt(account.getUpdatedAt());
//
//            accounts.add(accountDTO);
//        }
//        return accounts;
//    }
//
//    @Override
//    public boolean checkLogin(String username, String password) {
//        List<Account> listAccount = accountRespository.findByUsernameAndPasswordHash(username, password);
//
//        if (listAccount.size() > 0) {
//            return true;
//        }
//        return false;
//    }

    @Override
    public RegisterDTO register(RegisterRequest registerRequest) {
        try {
            // Validate input
            if (registerRequest.getUsername() == null || registerRequest.getPassword() == null) {
                throw new IllegalArgumentException("Username or password is null");
            }
            if (accountRespository.existsByUsername(registerRequest.getUsername())) {
                throw new IllegalStateException("Username already exists");
            }

            // Tạo account
            Account account = Account.builder()
                    .username(registerRequest.getUsername())
                    .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Account.Role.PATIENT)
                    .build();

            Account savedAccount = accountRespository.save(account);

            // Tạo patient gắn với account
            Patient patient = Patient.builder()
                    .account(savedAccount)
                    .build();
            patientRepository.save(patient);

            // Trả về response
            return new RegisterDTO(
                    savedAccount.getId(),
                    savedAccount.getUsername(),
                    savedAccount.getRole().name()
            );

        } catch (IllegalArgumentException | IllegalStateException e) {
            // Lỗi do người dùng (input không hợp lệ, trùng username, ...)
            throw e;  // ném lên controller để map sang HTTP 400/409
        } catch (Exception e) {
            // Lỗi hệ thống (DB, null pointer, ...)
            throw new RuntimeException("Register failed: " + e.getMessage(), e);
        }
    }

    @Override
    public LoginDTO login(LoginRequest loginRequest) {
//        System.out.println(loginRequest.getUsername());
        Account account = accountRespository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

//        System.out.println("passowrd: " + loginRequest.getPassword());
//        System.out.println("passowrdHash: " + passwordEncoder.matches(loginRequest.getPassword(), account.getPasswordHash()));
        if (!passwordEncoder.matches(loginRequest.getPassword(), account.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = jwtUtils.generateToken(account.getUsername(), account.getRole().name());
//        System.out.println("token: " + token);
        return new LoginDTO(account.getUsername(), account.getRole().name(), token);
    }


}
