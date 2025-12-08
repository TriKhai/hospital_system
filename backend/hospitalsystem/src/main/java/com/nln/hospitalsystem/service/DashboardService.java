package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.dto.dashboard.AppointmentChartDTO;
import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;

import java.time.LocalDate;
import java.util.List;

public interface DashboardService {
    DashboardDTO getSummary();
    WeeklyAppointmentDTO getWeeklyAppointments();
    List<AppointmentStatusStatsDTO> getAppointmentStatusStats();

    List<AppointmentChartDTO> getStatsByHour(LocalDate date, String shift);
    List<AppointmentChartDTO> getStatsByWeekday(LocalDate date);
    List<AppointmentChartDTO> getStatsByWeek(int month, int year);
    List<AppointmentChartDTO> getStatsByMonthDay(int month, int year);
    List<AppointmentChartDTO> getStatsByYearMonth(int year);
    List<AppointmentDTO> getLatestAppointments(int limit);

}
