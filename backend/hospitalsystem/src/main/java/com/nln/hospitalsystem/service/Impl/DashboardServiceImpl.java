package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.repository.*;
import com.nln.hospitalsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DrugRepository drugRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public DashboardDTO getSummary() {

        LocalDate today = LocalDate.now();

        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalDepartments = departmentRepository.count();
        long totalSpecialties = specialtyRepository.count();

        long totalBlogs = blogRepository.count();
        long totalAppointments = appointmentRepository.count();
        long totalDrugs = drugRepository.count();

        long appointmentsToday = appointmentRepository.countAppointmentsByWorkDate(today);

        return new DashboardDTO(
                totalPatients,
                totalDoctors,
                totalDepartments,
                totalSpecialties,
                appointmentsToday,
                totalAppointments,
                totalDrugs,
                totalBlogs
        );
    }

    @Override
    public WeeklyAppointmentDTO getWeeklyAppointments() {
        LocalDate today = LocalDate.now();
        LocalDate monday = today.with(DayOfWeek.MONDAY);
        LocalDate sunday = monday.plusDays(6);

        List<Object[]> raw = appointmentRepository.countPatientGenderWeekly(monday, sunday);

        List<String> labels = new ArrayList<>();
        List<Long> male = new ArrayList<>();
        List<Long> female = new ArrayList<>();

        for (Object[] row : raw) {
            LocalDate date = (LocalDate) row[0];
            Number maleCount = (Number) row[1];
            Number femaleCount = (Number) row[2];

            labels.add(convertDay(date.getDayOfWeek()));         // "T2","T3",...
            male.add(maleCount.longValue());
            female.add(femaleCount.longValue());
        }

        return WeeklyAppointmentDTO.builder()
                .labels(labels)
                .male(male)
                .female(female)
                .build();
    }

    @Override
    public List<AppointmentStatusStatsDTO> getAppointmentStatusStats() {
        List<Object[]> raw = appointmentRepository.countByStatus();

        List<AppointmentStatusStatsDTO> result = new ArrayList<>();

        for (Object[] row : raw) {
            AppointmentStatus status = (AppointmentStatus) row[0];
            Long count = (Long) row[1];

            result.add(new AppointmentStatusStatsDTO(
                    status.name(),   // trả string
                    count
            ));
        }

        return result;
    }


    // Helper
    private String convertDay(DayOfWeek d) {
        return switch (d) {
            case MONDAY -> "T2";
            case TUESDAY -> "T3";
            case WEDNESDAY -> "T4";
            case THURSDAY -> "T5";
            case FRIDAY -> "T6";
            case SATURDAY -> "T7";
            case SUNDAY -> "CN";
        };
    }
}
