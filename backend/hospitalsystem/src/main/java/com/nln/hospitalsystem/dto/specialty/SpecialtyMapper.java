package com.nln.hospitalsystem.dto.specialty;

import com.nln.hospitalsystem.entity.Specialty;

public class SpecialtyMapper {

    public static SpecialtyDTO toDTO(Specialty entity) {
        if (entity == null) return null;
        return SpecialtyDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static Specialty toEntity(SpecialtyDTO dto) {
        if (dto == null) return null;
        return Specialty.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}