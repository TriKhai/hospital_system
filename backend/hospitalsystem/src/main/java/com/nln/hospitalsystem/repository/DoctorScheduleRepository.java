package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.DoctorSchedule;
import com.nln.hospitalsystem.entity.key.DoctorScheduleKey;
import com.nln.hospitalsystem.enums.Shifts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, DoctorScheduleKey> {

    @Query("SELECT ds FROM DoctorSchedule ds " +
            "JOIN ds.doctor d " +
            "WHERE d.specialty.id = :specialtyId")
    List<DoctorSchedule> findBySpecialtyId(@Param("specialtyId") Integer specialtyId);

    @Query("SELECT CASE WHEN COUNT(ds) > 0 THEN true ELSE false END " +
            "FROM DoctorSchedule ds " +
            "WHERE ds.doctor = :doctor AND ds.schedule.workDate = :workDate AND ds.shiftType = :shiftType")
    boolean existsByDoctorAndWorkDateAndShiftType(@Param("doctor") Doctor doctor,
                                                  @Param("workDate") LocalDate workDate,
                                                  @Param("shiftType") Shifts shiftType);

}
