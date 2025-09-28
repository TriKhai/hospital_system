package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByAccount_Username(String username);
    List<Doctor> findBySpecialtyId(Integer specialtyID);
    // Lấy tất cả doctor
    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.doctorWorkDetails dw LEFT JOIN FETCH dw.workDetail wd LEFT JOIN FETCH wd.shift s LEFT JOIN FETCH s.work w")
    List<Doctor> findAllWithWorkDetails();

    // Lấy doctor theo specialty
    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.doctorWorkDetails dw LEFT JOIN FETCH dw.workDetail wd LEFT JOIN FETCH wd.shift s LEFT JOIN FETCH s.work w WHERE d.specialty.id = :specialtyId")
    List<Doctor> findAllWithWorkDetailsBySpecialty(@Param("specialtyId") Integer specialtyId);


    @Query("""
        SELECT DISTINCT d FROM Doctor d
        JOIN FETCH d.doctorWorkDetails dwd
        JOIN FETCH dwd.workDetail wd
        JOIN FETCH wd.shift s
        JOIN FETCH s.work w
        WHERE w.workDate >= CURRENT_DATE
    """)
    List<Doctor> findAllUpcomingWithWorkDetails();

    @Query("""
        SELECT DISTINCT d FROM Doctor d
        JOIN FETCH d.doctorWorkDetails dwd
        JOIN FETCH dwd.workDetail wd
        JOIN FETCH wd.shift s
        JOIN FETCH s.work w
        WHERE w.workDate >= CURRENT_DATE
          AND d.specialty.id = :specialtyId
    """)
    List<Doctor> findAllUpcomingBySpecialty(@Param("specialtyId") Integer specialtyId);


}
