package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    List<Account> findByUsernameAndPasswordHash(String username, String passwordHash);
    boolean existsByUsername(String username);
    Optional<Account> findByUsername(String username);


}