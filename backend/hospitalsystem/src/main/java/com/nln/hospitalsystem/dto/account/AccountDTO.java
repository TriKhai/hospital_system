package com.nln.hospitalsystem.dto.account;

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
    private int id;
    private String username;
    private String role;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
