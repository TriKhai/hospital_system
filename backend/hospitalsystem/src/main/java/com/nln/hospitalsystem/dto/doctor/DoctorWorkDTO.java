package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.dto.slot.SlotDTO;
import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorWorkDTO {
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
    private List<SlotDTO> slots;
}