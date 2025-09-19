package com.nln.hospitalsystem.payload.request.department;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentRequest {
    private String name;
    private String description;
}
