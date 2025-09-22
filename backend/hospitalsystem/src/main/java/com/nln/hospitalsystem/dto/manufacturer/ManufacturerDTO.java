package com.nln.hospitalsystem.dto.manufacturer;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManufacturerDTO {
    private Integer id;
    private String name;
    private String country;
    private LocalDateTime createdAt;
}
