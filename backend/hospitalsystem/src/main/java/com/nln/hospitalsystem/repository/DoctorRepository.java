package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByAccount_Username(String username);
    List<Doctor> findBySpecialtyId(Integer specialtyID);

//    @Query("""
//        SELECT DISTINCT d FROM Doctor d
//        LEFT JOIN d.doctorSchedules ds
//        LEFT JOIN ds.schedule s
//        LEFT JOIN ds.slots sl
//        WHERE d.specialty.id = :specialtyId
//            AND sl.status = 'AVAILABLE'
//            AND s.workDate >= :fromDate
//            AND s.workDate <= :toDate
//        ORDER BY d.id, s.workDate, sl.startTime
//    """)
//    List<Doctor> findDoctorsWithAvailableSlotsBySpecialty(
//            @Param("specialtyId") Integer specialtyId,
//            @Param("fromDate") LocalDate fromDate,
//            @Param("toDate") LocalDate toDate
//    );
//
//    @Query("""
//        SELECT DISTINCT d FROM Doctor d
//        LEFT JOIN FETCH d.specialty s
//        WHERE s.id = :specialtyId
//    """)
//    List<Doctor> findDoctorsBySpecialty(@Param("specialtyId") Integer specialtyId);
}
