package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;
import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
