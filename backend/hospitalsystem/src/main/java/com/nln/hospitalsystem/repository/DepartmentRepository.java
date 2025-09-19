package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    boolean existsByName(String name);
    Department findByName(String name);
}
