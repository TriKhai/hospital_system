package com.nln.hospitalsystem.payload.request.doctor;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate birthDay;
    private Boolean gender; // true = male, false = female
    private MultipartFile image;
    private BigDecimal consultationFee;
    private LocalTime workingHours;
    private String licenseNumber;
    private Integer yearsOfExperience;
    private String degree;
    private String position;
}
