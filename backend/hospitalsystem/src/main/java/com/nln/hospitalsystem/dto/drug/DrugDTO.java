package com.nln.hospitalsystem.dto.drug;

import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DrugDTO {
    private Integer id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private LocalDate expiredAt;
    private String image;
    private String usageInstructions;
    private String effects;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private ManufacturerDTO manufacturer;
    private SupplierDTO supplier;
    private DrugTypeDTO drugType;
}
