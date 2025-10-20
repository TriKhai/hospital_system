package com.nln.hospitalsystem.payload.request.schedule;

import com.nln.hospitalsystem.enums.DoctorScheduleStatus;
import com.nln.hospitalsystem.enums.RepeatSchedule;
import com.nln.hospitalsystem.enums.Shifts;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleByDocRequest {
    private Integer doctorId;
    private Long scheduleId;
    private LocalDate workDate;
    private Shifts shift;
    private Integer slotMinutes;
    private RepeatSchedule repeat;
    private Integer repeatCount;
    private String note;
}