package com.nln.hospitalsystem.dto.schedule;

import com.nln.hospitalsystem.entity.Schedule;

public class ScheduleDocMapper {
    public static ScheduleDocDTO toDocDTO(Schedule entity) {
        if (entity == null) return null;

        ScheduleDocDTO dto = new ScheduleDocDTO();
        dto.setId(entity.getId());
        dto.setWorkDate(entity.getWorkDate());
        dto.setDelStatus(entity.getDelStatus());
        dto.setStatus(entity.getStatus());
        dto.setNote(entity.getNote());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

}
