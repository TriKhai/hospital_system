package com.nln.hospitalsystem.dto.specialty;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.entity.Department;
import com.nln.hospitalsystem.entity.Specialty;

public class SpecialtyMapper {

    public static SpecialtyDTO toDTO(Specialty entity) {
        if (entity == null) return null;

        return SpecialtyDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .createdAt(entity.getCreatedAt())
                .department(toDepartmentDTO(entity.getDepartment())) // map Department
                .build();
    }

    public static Specialty toEntity(SpecialtyDTO dto) {
        if (dto == null) return null;

        return Specialty.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .createdAt(dto.getCreatedAt())
                .department(toDepartmentEntity(dto.getDepartment())) // map DepartmentDTO
                .build();
    }

    private static DepartmentDTO toDepartmentDTO(Department entity) {
        if (entity == null) return null;

        return DepartmentDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    private static Department toDepartmentEntity(DepartmentDTO dto) {
        if (dto == null) return null;

        return Department.builder()
                .id(dto.getId())
                .name(dto.getName())
                .build();
    }
}