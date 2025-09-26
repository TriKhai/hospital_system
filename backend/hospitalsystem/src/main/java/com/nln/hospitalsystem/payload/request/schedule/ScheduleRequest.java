package com.nln.hospitalsystem.payload.request.schedule;

import com.nln.hospitalsystem.enums.RepeatSchedule;
import com.nln.hospitalsystem.enums.ScheduleStatus;
import com.nln.hospitalsystem.enums.Shifts;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleRequest {
    private Integer doctorId;
    private LocalDate workDate;
    private Shifts shift;         // enum MORNING, AFTERNOON, EVENING
    private Integer slotMinutes; // 30, 20...
    private RepeatSchedule repeat;
    private Integer repeatCount;
    private ScheduleStatus status;
}
