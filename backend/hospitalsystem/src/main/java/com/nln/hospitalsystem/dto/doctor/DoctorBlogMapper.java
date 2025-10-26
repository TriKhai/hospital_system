package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.entity.Doctor;

public class DoctorBlogMapper {
    public static DoctorBlogDTO toDTO (Doctor doctor) {
        if (doctor == null) return null;
        return DoctorBlogDTO.builder()
                .id(doctor.getId())
                .fullName(doctor.getName())
                .avatar(doctor.getImageUrl())
                .specialtyName(doctor.getSpecialty() != null ? doctor.getSpecialty().getName() : null)
                .build();
    }
}
