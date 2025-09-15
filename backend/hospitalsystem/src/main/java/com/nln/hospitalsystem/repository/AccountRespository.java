package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRespository extends JpaRepository<Account, Integer> {

    List<Account> findByUsernameAndPasswordHash(String username, String passwordHash);

}