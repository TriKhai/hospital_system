package com.nln.hospitalsystem.dto.schedule;

import com.nln.hospitalsystem.enums.DoctorScheduleStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleDTO {
    private String id;
    private String title;
    private String start; // ISO string
    private String end;   // ISO string
    private DoctorScheduleStatus status;
    private Integer doctorId;
    private Long scheduleId;
    private String note;
}
