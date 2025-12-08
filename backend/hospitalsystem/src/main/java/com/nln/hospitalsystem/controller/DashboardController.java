package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.dto.dashboard.AppointmentChartDTO;
import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;
import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ResponseData<DashboardDTO>> getSummary() {
        DashboardDTO dto = dashboardService.getSummary();
        return ResponseEntity.ok(ResponseData.success(dto, "Get summary successfully"));
    }

    @GetMapping("/appointments/week")
    public ResponseEntity<ResponseData<WeeklyAppointmentDTO>> getWeeklyAppointments() {
        WeeklyAppointmentDTO dto = dashboardService.getWeeklyAppointments();
        return ResponseEntity.ok(ResponseData.success(dto, "Get WeeklyAppointments successfully"));
    }

    @GetMapping("/appointments/status")
    public ResponseEntity<ResponseData<List<AppointmentStatusStatsDTO> >> getStatusStats() {
        List<AppointmentStatusStatsDTO>  dto = dashboardService.getAppointmentStatusStats();
        return ResponseEntity.ok(ResponseData.success(dto, "Get WeeklyAppointments successfully"));
    }

    @GetMapping("/appointments/hour")
    public ResponseEntity<ResponseData<List<AppointmentChartDTO> >> getHourlyStats(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "all") String shift
    ) {
        List<AppointmentChartDTO>  dto = dashboardService.getStatsByHour(date, shift);
        return ResponseEntity.ok(ResponseData.success(dto, "Get slots of day successfully"));
    }

    @GetMapping("/appointments/weekday")
    public ResponseEntity<ResponseData<List<AppointmentChartDTO> >> getWeekStats(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<AppointmentChartDTO>  dto = dashboardService.getStatsByWeekday(date);
        return ResponseEntity.ok(ResponseData.success(dto, "Get days of week successfully"));
    }

    @GetMapping("/appointments/week-of-month")
    public ResponseEntity<ResponseData<List<AppointmentChartDTO> >> getStatsByWeek(
            @RequestParam int month,
            @RequestParam int year
    ) {
        List<AppointmentChartDTO>  dto = dashboardService.getStatsByWeek(month, year);
        return ResponseEntity.ok(ResponseData.success(dto, "Get weeks of month successfully"));
    }

    @GetMapping("/appointments/day-of-month")
    public ResponseEntity<ResponseData<List<AppointmentChartDTO> >> getStatsByMonthDay(
            @RequestParam int month,
            @RequestParam int year
    ) {
        List<AppointmentChartDTO>  dto = dashboardService.getStatsByMonthDay(month, year);
        return ResponseEntity.ok(ResponseData.success(dto, "Get days of month successfully"));
    }

    @GetMapping("/appointments/month-of-year")
    public ResponseEntity<ResponseData<List<AppointmentChartDTO> >> getStatsByYearMonth(
            @RequestParam int year
    ) {
        List<AppointmentChartDTO>  dto = dashboardService.getStatsByYearMonth(year);
        return ResponseEntity.ok(ResponseData.success(dto, "Get months of year successfully"));
    }

    @GetMapping("/appointments/latest")
    public ResponseEntity<ResponseData<List<AppointmentDTO> >> getLatestAppointments(
            @RequestParam(defaultValue = "5") int limit
    ) {
        List<AppointmentDTO>  dto = dashboardService.getLatestAppointments(limit);
        return ResponseEntity.ok(ResponseData.success(dto, "Get appointments latest successfully"));
    }

}
