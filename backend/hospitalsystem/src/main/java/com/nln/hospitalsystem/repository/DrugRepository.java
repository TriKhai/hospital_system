package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Integer> {
}
