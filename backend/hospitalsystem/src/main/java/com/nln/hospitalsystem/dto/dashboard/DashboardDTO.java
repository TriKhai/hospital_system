package com.nln.hospitalsystem.dto.dashboard;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardDTO {
    private long totalPatients;
    private long totalDoctors;
    private long totalDepartments;
    private long totalSpecialties;
    private long appointmentsToday;
    private long totalAppointments;
    private long totalDrugs;
    private long totalBlogs;
}