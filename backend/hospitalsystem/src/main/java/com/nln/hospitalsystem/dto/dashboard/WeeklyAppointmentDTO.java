package com.nln.hospitalsystem.dto.dashboard;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeeklyAppointmentDTO {
    private List<String> labels;
    private List<Long> male;
    private List<Long> female;
}
