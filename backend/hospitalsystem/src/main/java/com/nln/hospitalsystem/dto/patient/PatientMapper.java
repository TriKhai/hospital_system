package com.nln.hospitalsystem.dto.patient;

import com.nln.hospitalsystem.entity.Patient;

public class PatientMapper {
    public static PatientDTO toDTO(Patient patient) {
        if (patient == null) return null;

        return PatientDTO.builder()
                .id(patient.getId())
                .name(patient.getName() != null ? patient.getName() : "")
                .birthDate(patient.getBirthDate()) // null được phép
                .gender(patient.getGender() != null ? patient.getGender() : true)
                .address(patient.getAddress() != null ? patient.getAddress() : "")
                .email(patient.getEmail() != null ? patient.getEmail() : "")
                .phone(patient.getPhone() != null ? patient.getPhone() : "")
                .imageUrl(patient.getImageUrl())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

}
