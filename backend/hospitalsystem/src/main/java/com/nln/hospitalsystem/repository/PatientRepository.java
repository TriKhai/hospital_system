package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Optional<Patient> findByAccount_Id(Integer accountId);
    Optional<Patient> findByAccount_Username(String username);
//    Optional<Patient> findById(Integer id);

}
