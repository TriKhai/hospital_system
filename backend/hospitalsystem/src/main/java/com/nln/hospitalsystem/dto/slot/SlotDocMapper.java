package com.nln.hospitalsystem.dto.slot;

import com.nln.hospitalsystem.dto.schedule.ScheduleDocDTO;
import com.nln.hospitalsystem.entity.Schedule;
import com.nln.hospitalsystem.entity.Slot;

public class SlotDocMapper {
    public static SlotDocDTO toDocDTO(Slot entity) {
        if (entity == null) return null;

        SlotDocDTO dto = new SlotDocDTO();
        dto.setId(entity.getId());
        dto.setStatus(entity.getStatus());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

}
