package com.nln.hospitalsystem.dto.schedule;

import com.nln.hospitalsystem.enums.RecordStatus;
import com.nln.hospitalsystem.enums.ShiftStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleDocDTO {
    private Long id;
    private LocalDate workDate; // lưu ngày cụ thể
    private RecordStatus delStatus;
    private ShiftStatus status;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}