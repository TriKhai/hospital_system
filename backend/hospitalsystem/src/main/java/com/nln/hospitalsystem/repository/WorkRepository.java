package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Integer> {
    boolean existsByWorkDate(LocalDate workDate);
    Optional<Work> findByWorkDate(LocalDate workDate);


}
