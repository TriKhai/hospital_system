package com.nln.hospitalsystem.dto.schedule;

import com.nln.hospitalsystem.entity.DoctorSchedule;
import com.nln.hospitalsystem.entity.Schedule;

import java.time.LocalDateTime;

public class ScheduleMapper {

    public static ScheduleDTO toDTO(DoctorSchedule doctorSchedule) {
        if (doctorSchedule == null || doctorSchedule.getSchedule() == null) {
            return null;
        }

        Schedule schedule = doctorSchedule.getSchedule();

        return ScheduleDTO.builder()
                .id(schedule.getId() + "-" + doctorSchedule.getDoctor().getId())
                .title("BS " + doctorSchedule.getDoctor().getName()
                        + " (" + doctorSchedule.getDoctor().getSpecialty().getName() + ")")
                .start(schedule.getWorkDate() != null && doctorSchedule.getStartTime() != null
                        ? LocalDateTime.of(schedule.getWorkDate(), doctorSchedule.getStartTime()).toString()
                        : null)
                .end(schedule.getWorkDate() != null && doctorSchedule.getEndTime() != null
                        ? LocalDateTime.of(schedule.getWorkDate(), doctorSchedule.getEndTime()).toString()
                        : null)
                .status(doctorSchedule.getStatus())
                .doctorId(doctorSchedule.getDoctor().getId())
                .scheduleId(doctorSchedule.getSchedule().getId())
                .note(doctorSchedule.getNote())
                .build();
    }
}
