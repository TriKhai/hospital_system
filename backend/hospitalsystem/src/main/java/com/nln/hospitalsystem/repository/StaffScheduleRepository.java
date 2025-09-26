package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.StaffSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface StaffScheduleRepository extends JpaRepository<StaffSchedule, Integer> {
    List<StaffSchedule> findByDoctor_SpecialtyId(Integer specialtyID);
    boolean existsByDoctorAndWorkDateAndStartTime(Doctor doctor, LocalDate workDate, LocalTime startTime);
    List<StaffSchedule> findByDoctorAndWorkDate(Doctor doctor, LocalDate workDate);
}
