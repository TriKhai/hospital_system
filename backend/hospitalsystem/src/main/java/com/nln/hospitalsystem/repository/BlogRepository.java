package com.nln.hospitalsystem.repository;

import com.nln.hospitalsystem.entity.Blog;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.enums.BlogStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
    List<Blog> findByStatus(BlogStatus status);
    List<Blog> findByAuthor(Doctor doctor);
}
