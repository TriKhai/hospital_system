package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.dto.department.DepartmentMapper;
import com.nln.hospitalsystem.entity.Department;
import com.nln.hospitalsystem.payload.request.department.DepartmentRequest;
import com.nln.hospitalsystem.repository.DepartmentRepository;
import com.nln.hospitalsystem.service.DepartmentService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<DepartmentDTO> importDepartments(MultipartFile file) {
        List<Department> departments = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(reader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {

            for (CSVRecord record : csvParser) {
                Department dept = new Department();
                dept.setName(record.get("name"));
                dept.setDescription(record.get("description"));
                departments.add(dept);
            }

            return departmentRepository.saveAll(departments)
                    .stream()
                    .map(DepartmentMapper::toDTO)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage());
        }
    }
}
