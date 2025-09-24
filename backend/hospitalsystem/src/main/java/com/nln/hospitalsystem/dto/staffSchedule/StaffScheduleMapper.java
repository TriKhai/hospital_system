package com.nln.hospitalsystem.dto.staffSchedule;

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
                .doctor(schedule.getDoctor()) // hoặc map sang DoctorDTO nếu muốn
                .createdAt(schedule.getCreatedAt())
                .build();
    }

    public static StaffSchedule toEntity(StaffScheduleDTO dto) {
        if (dto == null) return null;

        return StaffSchedule.builder()
                .id(dto.getId())
                .workDate(dto.getWorkDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .status(dto.getStatus())
                .doctor(dto.getDoctor()) // cần set doctor từ DB khi create/update
                .createdAt(dto.getCreatedAt())
                .build();
    }
}
