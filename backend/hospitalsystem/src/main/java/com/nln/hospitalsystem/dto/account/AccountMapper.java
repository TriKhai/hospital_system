package com.nln.hospitalsystem.dto.account;

import com.nln.hospitalsystem.entity.Account;

public class AccountMapper {
    public static AccountDTO toDTO(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setUsername(account.getUsername());
        dto.setRole(account.getRole().name());
        dto.setCreatedAt(account.getCreatedAt());
        dto.setUpdatedAt(account.getUpdatedAt());
        dto.setPassword(account.getPasswordHash());
        // token, password thường không set trực tiếp ở đây
        return dto;
    }

    public static Account toEntity(AccountDTO dto) {
        Account account = new Account();
        account.setId(dto.getId());
        account.setUsername(dto.getUsername());
        account.setRole(Account.Role.valueOf(dto.getRole()));
        account.setCreatedAt(dto.getCreatedAt());
        account.setUpdatedAt(dto.getUpdatedAt());
        return account;
    }
}
