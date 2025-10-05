package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.DoctorSchedule;
import com.nln.hospitalsystem.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
    boolean existsByDoctorScheduleAndStartTimeAndEndTime(
            DoctorSchedule doctorSchedule,
            LocalTime startTime,
            LocalTime endTime
    );

    List<Slot> findByDoctorSchedule(DoctorSchedule doctorSchedule);

    @Query("""
        SELECT s FROM Slot s
        JOIN s.doctorSchedule ds
        JOIN ds.schedule sch
        JOIN ds.doctor d
        WHERE d.id = :doctorId
          AND s.status = 'AVAILABLE'
          AND sch.workDate BETWEEN :fromDate AND :toDate
        ORDER BY sch.workDate, s.startTime
    """)
    List<Slot> findAvailableSlotsByDoctor(
            @Param("doctorId") Integer doctorId,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

    @Query("""
        SELECT s FROM Slot s
        JOIN s.doctorSchedule ds
        JOIN ds.schedule sch
        JOIN ds.doctor d
        WHERE d.id IN :doctorIds
          AND s.status = 'AVAILABLE'
          AND sch.workDate BETWEEN :fromDate AND :toDate
        ORDER BY d.id, sch.workDate, s.startTime
    """)
        List<Slot> findAvailableSlotsByDoctorIdsAndDateRange(
                @Param("doctorIds") List<Integer> doctorIds,
                @Param("fromDate") LocalDate fromDate,
                @Param("toDate") LocalDate toDate
        );






}
