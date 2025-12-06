package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Appointment;
import com.nln.hospitalsystem.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("SELECT a FROM Appointment a WHERE a.patient.account.username = :username")
    List<Appointment> findByPatientAccountUsername(String username);
    List<Appointment> findBySlotDoctorScheduleDoctorAccountUsername(String username);


    List<Appointment> findBySlot_DoctorSchedule(DoctorSchedule doctorSchedule);

    @Query("""
           SELECT COUNT(a)
           FROM Appointment a
           WHERE a.delStatus = com.nln.hospitalsystem.enums.RecordStatus.ACTIVE
             AND a.slot.doctorSchedule.schedule.workDate = :date
           """)
    long countAppointmentsByWorkDate(@Param("date") LocalDate date);

    // Lay danh sach benh nhan trong tuan
    @Query("""
           SELECT a.slot.doctorSchedule.schedule.workDate,
                  SUM(CASE WHEN a.patient.gender = TRUE THEN 1 ELSE 0 END),
                  SUM(CASE WHEN a.patient.gender = FALSE THEN 1 ELSE 0 END)
           FROM Appointment a
           WHERE a.delStatus = com.nln.hospitalsystem.enums.RecordStatus.ACTIVE
             AND a.slot.doctorSchedule.schedule.workDate BETWEEN :start AND :end
           GROUP BY a.slot.doctorSchedule.schedule.workDate
           ORDER BY a.slot.doctorSchedule.schedule.workDate
           """)
    List<Object[]> countPatientGenderWeekly(@Param("start") LocalDate start,
                                            @Param("end") LocalDate end);

    @Query("""
       SELECT a.status, COUNT(a)
       FROM Appointment a
       WHERE a.delStatus = com.nln.hospitalsystem.enums.RecordStatus.ACTIVE
       GROUP BY a.status
       """)
    List<Object[]> countByStatus();

}
