package com.nln.hospitalsystem.dto.staffSchedule;

import com.nln.hospitalsystem.entity.StaffSchedule;
import com.nln.hospitalsystem.enums.ScheduleStatus;

public class ScheduleMapper {

    public static ScheduleDTO toDTO(StaffSchedule s) {
        String id = s.getId().toString();
        String title = "BS " + s.getDoctor().getName() +
                " (" + s.getDoctor().getSpecialty().getName() + ")";
        String start = s.getWorkDate().toString() + "T" + s.getStartTime();
        String end = s.getWorkDate().toString() + "T" + s.getEndTime();
        ScheduleStatus status = s.getStatus(); // ACTIVE/INACTIVE
        Integer doctorId = s.getDoctor().getId();

        return new ScheduleDTO(id, title, start, end, status, doctorId);
    }
}
