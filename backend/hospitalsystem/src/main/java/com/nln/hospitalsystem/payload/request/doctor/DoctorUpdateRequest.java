package com.nln.hospitalsystem.payload.request.doctor;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorUpdateRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate birthDay;
    private Boolean gender; // true = male, false = female
    private BigDecimal consultationFee;
    private String licenseNumber;
    private Integer yearsOfExperience;
    private String degree;
    private String position;
    private Integer specialtyId;
}