package com.nln.hospitalsystem.dto.doctor;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorBlogDTO {
    private Integer id;
    private String fullName;
    private String avatar;
    private String specialtyName;
}
