package com.nln.hospitalsystem.dto.drugType;

import com.nln.hospitalsystem.entity.DrugType;

public class DrugTypeMapper {
    public static DrugTypeDTO toDTO(DrugType entity) {
        if (entity == null) return null;
        return DrugTypeDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .unit(entity.getUnit())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static DrugType toEntity(DrugTypeDTO dto) {
        if (dto == null) return null;
        return DrugType.builder()
                .id(dto.getId())
                .name(dto.getName())
                .unit(dto.getUnit())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
