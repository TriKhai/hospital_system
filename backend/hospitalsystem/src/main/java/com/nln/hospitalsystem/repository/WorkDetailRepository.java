package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.WorkDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkDetailRepository extends JpaRepository<WorkDetail, Integer> {
}
