package com.nln.hospitalsystem.payload.request.specialty;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SpecialtyRequest {
    private String name;
    private String description;
    private Integer departmentId;
}
