package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;

import java.util.List;

public interface DashboardService {
    DashboardDTO getSummary();
    WeeklyAppointmentDTO getWeeklyAppointments();
    List<AppointmentStatusStatsDTO> getAppointmentStatusStats();

}
