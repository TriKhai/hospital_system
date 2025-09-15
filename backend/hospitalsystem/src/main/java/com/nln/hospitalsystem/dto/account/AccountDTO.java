package com.nln.hospitalsystem.dto.account;

import com.nln.hospitalsystem.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Integer id;
    private String username;
    private String passwordHash;
    private Account.Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
