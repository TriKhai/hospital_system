package com.nln.hospitalsystem.dto.manufacturer;

import com.nln.hospitalsystem.entity.Manufacturer;

public class ManufacturerMapper {
    public static ManufacturerDTO toDTO(Manufacturer manufacturer) {
        if(manufacturer == null) return null;
        return ManufacturerDTO.builder()
                .id(manufacturer.getId())
                .name(manufacturer.getName())
                .country(manufacturer.getCountry())
                .createdAt(manufacturer.getCreatedAt())
                .build();
    }

    public static Manufacturer toEntity(ManufacturerDTO dto) {
        if (dto == null) return null;
        return Manufacturer.builder()
                .id(dto.getId())
                .name(dto.getName())
                .country(dto.getCountry())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
