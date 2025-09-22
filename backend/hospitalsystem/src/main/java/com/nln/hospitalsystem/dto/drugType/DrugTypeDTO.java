package com.nln.hospitalsystem.dto.drugType;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DrugTypeDTO {
    private Integer id;
    private String name;
    private String unit;
    private LocalDateTime createdAt;
}
