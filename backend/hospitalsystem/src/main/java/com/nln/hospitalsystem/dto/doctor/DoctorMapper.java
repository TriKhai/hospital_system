package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.entity.Doctor;

public class DoctorMapper {
    public static DoctorDTO toDTO(Doctor doctor) {
        if (doctor == null) {
            return null;
        }
        return DoctorDTO.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .email(doctor.getEmail())
                .phone(doctor.getPhone())
                .address(doctor.getAddress())
                .birthDay(doctor.getBirthDay()) // assuming entity field is birthDate
                .gender(doctor.getGender())
                .imageUrl(doctor.getImageUrl() != null ? "doctor/" + doctor.getImageUrl() : "default-avatar.png")
                .consultationFee(doctor.getConsultationFee())
                .workingHours(doctor.getWorkingHours())
                .licenseNumber(doctor.getLicenseNumber())
                .yearsOfExperience(doctor.getYearsOfExperience())
                .degree(doctor.getDegree())
                .position(doctor.getPosition())
                .createdAt(doctor.getCreatedAt())
                .updatedAt(doctor.getUpdatedAt())
                .build();
    }
}
