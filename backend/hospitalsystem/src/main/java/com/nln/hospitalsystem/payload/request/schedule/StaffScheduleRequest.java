package com.nln.hospitalsystem.payload.request.schedule;

import com.nln.hospitalsystem.enums.ScheduleStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffScheduleRequest {
        private Integer doctorId;
        private LocalDate workDate;
        private LocalTime startTime;
        private LocalTime endTime;
        private ScheduleStatus status;
}
