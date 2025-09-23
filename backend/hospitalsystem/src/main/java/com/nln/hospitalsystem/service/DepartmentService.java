package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.payload.request.department.DepartmentRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DepartmentService {
    DepartmentDTO createDepartment(DepartmentRequest departmentRequest);
    DepartmentDTO updateDepartment(Integer id, DepartmentRequest request);
    void deleteDepartment(Integer id);
    List <DepartmentDTO> getAllDepartment();
    Long countAllDepartment();
    List<DepartmentDTO> importDepartments(MultipartFile file);
}
