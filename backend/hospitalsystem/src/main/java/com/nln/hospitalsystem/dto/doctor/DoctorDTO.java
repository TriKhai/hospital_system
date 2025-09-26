package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorDTO {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate birthDay;
    private Boolean gender; // true = male, false = female
    private String imageUrl;
    private BigDecimal consultationFee;
    private LocalTime workingHours;
    private String licenseNumber;
    private Integer yearsOfExperience;
    private String degree;
    private String position;
    private SpecialtyDTO specialty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
