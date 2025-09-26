package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.dto.specialty.SpecialtyMapper;
import com.nln.hospitalsystem.entity.Doctor;

public class DoctorMapper {
    public static DoctorDTO toDTO(Doctor doctor) {
        if (doctor == null) return null;

        return DoctorDTO.builder()
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

    // DTO -> Entity
    public static Doctor toEntity(DoctorDTO dto) {
        if (dto == null) return null;

        Doctor doctor = new Doctor();
        doctor.setId(dto.getId());
        doctor.setName(dto.getName());
        doctor.setEmail(dto.getEmail());
        doctor.setPhone(dto.getPhone());
        doctor.setAddress(dto.getAddress());
        doctor.setBirthDay(dto.getBirthDay());
        doctor.setGender(dto.getGender());
        doctor.setImageUrl(dto.getImageUrl());
        doctor.setConsultationFee(dto.getConsultationFee());
        doctor.setWorkingHours(dto.getWorkingHours());
        doctor.setLicenseNumber(dto.getLicenseNumber());
        doctor.setYearsOfExperience(dto.getYearsOfExperience());
        doctor.setDegree(dto.getDegree());
        doctor.setPosition(dto.getPosition());
        doctor.setSpecialty(SpecialtyMapper.toEntity(dto.getSpecialty()));
        doctor.setCreatedAt(dto.getCreatedAt());
        doctor.setUpdatedAt(dto.getUpdatedAt());
        return doctor;
    }

    public static DoctorLiteDTO toLiteDTO(Doctor doctor) {
        if (doctor == null) return null;
        return new DoctorLiteDTO(doctor.getId(), doctor.getName());
    }
}
