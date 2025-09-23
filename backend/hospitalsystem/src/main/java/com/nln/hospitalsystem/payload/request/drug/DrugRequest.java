package com.nln.hospitalsystem.payload.request.drug;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DrugRequest {
    private String name;
    private BigDecimal price;
    private Integer stock;
    private LocalDate expiredAt;
    private MultipartFile image;
    private String usageInstructions;
    private String effects;
    private Integer manufacturerId;
    private Integer supplierId;
    private Integer drugTypeId;
}