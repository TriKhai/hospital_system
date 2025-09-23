package com.nln.hospitalsystem.dto.drug;

import com.nln.hospitalsystem.dto.drugType.DrugTypeMapper;
import com.nln.hospitalsystem.dto.manufacturer.ManufacturerMapper;
import com.nln.hospitalsystem.dto.supplier.SupplierMapper;
import com.nln.hospitalsystem.entity.Drug;

public class DrugMapper {
    public static DrugDTO toDTO(Drug entity) {
        if (entity == null) return null;
        return DrugDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .price(entity.getPrice())
                .stock(entity.getStock())
                .expiredAt(entity.getExpiredAt())
                .image(entity.getImageUrl())
                .usageInstructions(entity.getUsageInstructions())
                .effects(entity.getEffects())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .manufacturer(ManufacturerMapper.toDTO(entity.getManufacturer()))
                .supplier(SupplierMapper.toDTO(entity.getSupplier()))
                .drugType(DrugTypeMapper.toDTO(entity.getDrugType()))
                .build();
    }

    public static Drug toEntity(DrugDTO dto) {
        if (dto == null) return null;
        return Drug.builder()
                .id(dto.getId())
                .name(dto.getName())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .expiredAt(dto.getExpiredAt())
                .imageUrl(dto.getImage())
                .usageInstructions(dto.getUsageInstructions())
                .effects(dto.getEffects())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .manufacturer(ManufacturerMapper.toEntity(dto.getManufacturer()))
                .supplier(SupplierMapper.toEntity(dto.getSupplier()))
                .drugType(DrugTypeMapper.toEntity(dto.getDrugType()))
                .build();
    }
}
