package com.nln.hospitalsystem.dto.slot;

import com.nln.hospitalsystem.enums.SlotStatus;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SlotDTO {
    private Long id;
    private SlotStatus status;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate workDate;
}
