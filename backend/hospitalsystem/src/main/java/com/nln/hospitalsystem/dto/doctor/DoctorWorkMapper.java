package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.dto.specialty.SpecialtyMapper;
import com.nln.hospitalsystem.entity.Doctor;

public class DoctorWorkMapper {
    public static DoctorWorkDTO toDoctorWorkDTO(Doctor doctor) {
        if (doctor == null) return null;

        return DoctorWorkDTO.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .email(doctor.getEmail())
                .phone(doctor.getPhone())
                .address(doctor.getAddress())
                .birthDay(doctor.getBirthDay())
                .gender(doctor.getGender())
                .imageUrl(doctor.getImageUrl())
                .consultationFee(doctor.getConsultationFee())
                .workingHours(doctor.getWorkingHours())
                .licenseNumber(doctor.getLicenseNumber())
                .yearsOfExperience(doctor.getYearsOfExperience())
                .degree(doctor.getDegree())
                .position(doctor.getPosition())
                .specialty(SpecialtyMapper.toDTO(doctor.getSpecialty()))
                .createdAt(doctor.getCreatedAt())
                .updatedAt(doctor.getUpdatedAt())
                .build();
    }
}
