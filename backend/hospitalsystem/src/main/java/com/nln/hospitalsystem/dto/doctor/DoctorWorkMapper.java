package com.nln.hospitalsystem.dto.doctor;

import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.dto.specialty.SpecialtyMapper;
import com.nln.hospitalsystem.entity.Doctor;

import java.util.stream.Collectors;

public class DoctorWorkMapper {

    public static DoctorWorkDTO mapToDTO(Doctor doctor) {
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
                .doctorWorkDetails(
                        doctor.getDoctorWorkDetails().stream()
                                .map(dwd -> DoctorWorkDetailDTO.builder()
                                        .id(dwd.getWorkDetail().getId()) // <-- sửa ở đây
                                        .startTime(dwd.getWorkDetail().getStartTime())
                                        .endTime(dwd.getWorkDetail().getEndTime())
                                        .status(dwd.getWorkDetail().getStatus().name())
                                        .note(dwd.getWorkDetail().getNote())
                                        .shiftName(dwd.getWorkDetail().getShift().getShiftType().name())
                                        .workDate(dwd.getWorkDetail().getShift().getWork().getWorkDate())
                                        .build()
                                ).collect(Collectors.toList())
                )
                .build();
    }
}
