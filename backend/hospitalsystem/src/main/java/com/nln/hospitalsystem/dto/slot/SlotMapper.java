package com.nln.hospitalsystem.dto.slot;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.DoctorSchedule;
import com.nln.hospitalsystem.entity.Slot;
import com.nln.hospitalsystem.enums.SlotStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class SlotMapper {
    public static SlotDTO toDTO(Slot slot) {
        if (slot == null) return null;

        return SlotDTO.builder()
                .id(slot.getId())
                .status(slot.getStatus()) // Enum vẫn ok, Jackson sẽ serialize ra String
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .workDate(slot.getDoctorSchedule() != null && slot.getDoctorSchedule().getSchedule() != null
                        ? slot.getDoctorSchedule().getSchedule().getWorkDate()
                        : null)
                .build();
    }
}
