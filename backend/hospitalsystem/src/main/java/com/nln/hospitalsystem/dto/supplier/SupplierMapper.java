package com.nln.hospitalsystem.dto.supplier;

import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.entity.Manufacturer;
import com.nln.hospitalsystem.entity.Supplier;

public class SupplierMapper {
    public static SupplierDTO toDTO(Supplier supplier) {
        if(supplier == null) return null;
        return SupplierDTO.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .address(supplier.getAddress())
                .phone(supplier.getPhone())
                .email(supplier.getEmail())
                .createdAt(supplier.getCreatedAt())
                .build();
    }

    public static Supplier toEntity(SupplierDTO dto) {
        if (dto == null) return null;
        return Supplier.builder()
                .id(dto.getId())
                .name(dto.getName())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
