package com.nln.hospitalsystem.payload.request.patient;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientUpdateRequest {
    private String name;
    private LocalDate birthDate;
    private Boolean gender;
    private String address;
    private String email;
    private String phone;
}