package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.WorkDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkDetailRepository extends JpaRepository<WorkDetail, Integer> {
}
