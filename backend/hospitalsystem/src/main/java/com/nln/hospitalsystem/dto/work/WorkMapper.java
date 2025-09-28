package com.nln.hospitalsystem.dto.work;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.Work;
import com.nln.hospitalsystem.entity.WorkShift;
import com.nln.hospitalsystem.enums.ScheduleStatus;

public class WorkMapper {

    public static WorkDTO toDTO(WorkShift shift, Integer doctorId, String doctorName, String specialty) {
        String id = shift.getId().toString();
        String title = "BS " + doctorName + " (" + specialty + ")";
        String start = shift.getWork().getWorkDate().toString() + "T" + shift.getStartTime().toString();
        String end   = shift.getWork().getWorkDate().toString() + "T" + shift.getEndTime().toString();

        return new WorkDTO(id, title, start, end, shift.getShiftStatus(), doctorId);
    }
}

