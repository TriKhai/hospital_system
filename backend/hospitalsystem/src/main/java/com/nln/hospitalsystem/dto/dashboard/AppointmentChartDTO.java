package com.nln.hospitalsystem.dto.dashboard;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentChartDTO {
    private String label;
    private long active;
    private long cancelled;
}
