package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.dto.specialty.SpecialtyMapper;
import com.nln.hospitalsystem.entity.Department;
import com.nln.hospitalsystem.entity.Specialty;
import com.nln.hospitalsystem.payload.request.specialty.SpecialtyRequest;
import com.nln.hospitalsystem.repository.DepartmentRepository;
import com.nln.hospitalsystem.repository.SpecialtyRepository;
import com.nln.hospitalsystem.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {
    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public SpecialtyDTO createSpecialty(SpecialtyRequest request) {
        Department department = null;
        if (request.getDepartmentId() != null) {
            department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Department not found with id: " + request.getDepartmentId()));
        }

        Specialty specialty = Specialty.builder()
                .name(request.getName())
                .description(request.getDescription())
                .department(department) // có thể null
                .build();

        Specialty saved = specialtyRepository.save(specialty);
        return SpecialtyMapper.toDTO(saved);

    }

    @Override
    public SpecialtyDTO updateSpecialty(Integer id, SpecialtyRequest request) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Specialty not found with id: " + id));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Department not found with id: " + request.getDepartmentId()));

        specialty.setName(request.getName());
        specialty.setDescription(request.getDescription());
        specialty.setDepartment(department);

        Specialty updated = specialtyRepository.save(specialty);

        return SpecialtyMapper.toDTO(updated);
    }

    @Override
    public void deleteSpecialty(Integer id) {
        Specialty specialty = specialtyRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Specialty not found with id: " + id));
        try {
            specialtyRepository.delete(specialty);
        } catch (DataIntegrityViolationException e) {
            // Trường hợp bị ràng buộc foreign key
            throw new IllegalStateException(
                    "Cannot delete specialty because it is being used by doctors or other records.", e);
        } catch (Exception e) {
            // Lỗi khác (DB, transaction…)
            throw new RuntimeException("Unexpected error while deleting specialty.", e);
        }
    }

    @Override
    public List<SpecialtyDTO> getAllSpecialty() {
        try {
            List<Specialty> specialties = specialtyRepository.findAll();
            return specialties.stream()
                    .map(SpecialtyMapper::toDTO)
                    .toList();
        } catch (Exception e) {
            // Ghi log để dễ debug
            throw new RuntimeException("Error fetching specialties: " + e.getMessage(), e);
        }
    }
}
