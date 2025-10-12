package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Appointment;
import com.nln.hospitalsystem.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("SELECT a FROM Appointment a WHERE a.patient.account.username = :username")
    List<Appointment> findByPatientAccountUsername(String username);
    List<Appointment> findBySlotDoctorScheduleDoctorAccountUsername(String username);


    List<Appointment> findBySlot_DoctorSchedule(DoctorSchedule doctorSchedule);
}
