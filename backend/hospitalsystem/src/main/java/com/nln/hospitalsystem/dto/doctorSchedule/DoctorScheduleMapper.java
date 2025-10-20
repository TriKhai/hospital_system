package com.nln.hospitalsystem.dto.doctorSchedule;

import com.nln.hospitalsystem.dto.doctor.DoctorMapper;
import com.nln.hospitalsystem.dto.schedule.ScheduleDocDTO;
import com.nln.hospitalsystem.dto.schedule.ScheduleDocMapper;
import com.nln.hospitalsystem.dto.slot.SlotDocMapper;
import com.nln.hospitalsystem.entity.DoctorSchedule;

import java.util.stream.Collectors;

public class DoctorScheduleMapper {
    public static DoctorScheduleDTO toDTO(DoctorSchedule entity) {
        if (entity == null) return null;

        DoctorScheduleDTO dto = new DoctorScheduleDTO();
        dto.setId(entity.getId());
        dto.setDoctor(DoctorMapper.toDTO(entity.getDoctor()));
        dto.setSchedule(ScheduleDocMapper.toDocDTO(entity.getSchedule()));
        dto.setStatus(entity.getStatus());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setShiftType(entity.getShiftType());
        dto.setNote(entity.getNote());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        if (entity.getSlots() != null) {
            dto.setSlots(
                    entity.getSlots().stream()
                            .map(SlotDocMapper::toDocDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }
}
