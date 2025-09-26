package com.nln.hospitalsystem.dto.staffSchedule;

import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.drug.DrugMapper;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.StaffSchedule;
import lombok.*;

public class StaffScheduleMapper {
    public static StaffScheduleDTO toDTO(StaffSchedule schedule) {
        if (schedule == null) return null;

        return StaffScheduleDTO.builder()
                .id(schedule.getId())
                .workDate(schedule.getWorkDate())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .status(schedule.getStatus())
                .doctor(DoctorMapper.toDTO(schedule.getDoctor()))
                .createdAt(schedule.getCreatedAt())
                .build();
    }

    // Map từ DTO sang entity, cần doctor entity từ DB
    public static StaffSchedule toEntity(StaffScheduleDTO dto, Doctor doctorEntity) {
        if (dto == null) return null;

        return StaffSchedule.builder()
                .id(dto.getId())
                .workDate(dto.getWorkDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .status(dto.getStatus())
                .doctor(doctorEntity)
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
