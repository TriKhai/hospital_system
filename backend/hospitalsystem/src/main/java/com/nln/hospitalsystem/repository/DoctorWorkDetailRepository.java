package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.DoctorWorkDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorWorkDetailRepository extends JpaRepository<DoctorWorkDetail, Integer> {
    boolean existsByIdDoctorIdAndIdWorkDetailId(Integer doctorId, Long workDetailId);
}
