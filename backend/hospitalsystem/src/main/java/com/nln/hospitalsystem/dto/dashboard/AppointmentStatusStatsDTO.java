package com.nln.hospitalsystem.dto.dashboard;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentStatusStatsDTO {
    private String status;   // PENDING, CONFIRMED, COMPLETED...
    private Long count;
}
