package com.nln.hospitalsystem.dto.staffSchedule;

import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.enums.ScheduleStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffScheduleDTO {
    private Integer id;
    private LocalDate workDate; // lưu ngày cụ thể
    private LocalTime startTime;
    private LocalTime endTime;
    private ScheduleStatus status = ScheduleStatus.ACTIVE;
    private Doctor doctor;
    private LocalDateTime createdAt;
}
