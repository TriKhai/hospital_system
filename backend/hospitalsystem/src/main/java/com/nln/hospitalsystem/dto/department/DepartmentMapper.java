package com.nln.hospitalsystem.dto.department;

import com.nln.hospitalsystem.entity.Department;

public class DepartmentMapper {
    public static DepartmentDTO toDTO(Department entity) {
        if (entity == null) return null;
        return DepartmentDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static Department toEntity(DepartmentDTO dto) {
        if (dto == null) return null;
        return Department.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}

