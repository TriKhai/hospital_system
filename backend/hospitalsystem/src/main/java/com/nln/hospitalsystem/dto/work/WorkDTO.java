package com.nln.hospitalsystem.dto.work;

import com.nln.hospitalsystem.enums.ScheduleStatus;
import com.nln.hospitalsystem.enums.ShiftStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkDTO {
    private String id;
    private String title;
    private String start; // ISO string
    private String end;   // ISO string
    private ShiftStatus status;
    private Integer doctorId;
}
