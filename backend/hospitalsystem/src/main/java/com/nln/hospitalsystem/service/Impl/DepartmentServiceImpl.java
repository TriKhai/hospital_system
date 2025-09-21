package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.dto.department.DepartmentMapper;
import com.nln.hospitalsystem.entity.Department;
import com.nln.hospitalsystem.payload.request.department.DepartmentRequest;
import com.nln.hospitalsystem.repository.DepartmentRepository;
import com.nln.hospitalsystem.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;


    @Override
    public DepartmentDTO createDepartment(DepartmentRequest departmentRequest) {
        if(departmentRepository.existsByName(departmentRequest.getName())){
            throw new RuntimeException("Department already exists");
        }
        Department department = Department.builder()
                .name(departmentRequest.getName())
                .description(departmentRequest.getDescription())
                .build();

        Department saved = departmentRepository.save(department);
        return DepartmentMapper.toDTO(saved);
    }

    @Override
    public DepartmentDTO updateDepartment(Integer id, DepartmentRequest request) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        // Check trùng tên (nếu cần)
        if (!existing.getName().equals(request.getName()) &&
                departmentRepository.existsByName(request.getName())) {
            throw new RuntimeException("Department name already exists");
        }

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());

        Department updated = departmentRepository.save(existing);
        return DepartmentMapper.toDTO(updated);
    }

    @Override
    public void deleteDepartment(Integer id) {
        Department existing = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        departmentRepository.delete(existing);
    }

    @Override
    public List<DepartmentDTO> getAllDepartment() {
        return departmentRepository.findAll()
                .stream()
                .map(DepartmentMapper::toDTO)
                .toList();
    }

    @Override
    public Long countAllDepartment() {
        return departmentRepository.count();
    }
}
