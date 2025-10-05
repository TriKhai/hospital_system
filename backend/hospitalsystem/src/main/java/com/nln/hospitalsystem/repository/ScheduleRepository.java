package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Schedule;
import com.nln.hospitalsystem.enums.Shifts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findByWorkDate(LocalDate date);
}
