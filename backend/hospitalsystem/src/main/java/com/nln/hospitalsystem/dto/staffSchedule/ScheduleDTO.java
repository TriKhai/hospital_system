package com.nln.hospitalsystem.dto.staffSchedule;

import com.nln.hospitalsystem.enums.ScheduleStatus;
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
    private ScheduleStatus status;
    private Integer doctorId;
}
