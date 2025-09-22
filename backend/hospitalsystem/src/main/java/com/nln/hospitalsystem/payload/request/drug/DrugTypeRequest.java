package com.nln.hospitalsystem.payload.request.drug;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DrugTypeRequest {
    private String name;
    private String unit;
}
