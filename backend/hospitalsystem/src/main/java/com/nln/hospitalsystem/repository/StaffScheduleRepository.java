package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.StaffSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffScheduleRepository extends JpaRepository<StaffSchedule, Integer> {

}
