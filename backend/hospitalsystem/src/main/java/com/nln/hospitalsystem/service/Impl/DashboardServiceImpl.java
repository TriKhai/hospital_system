package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.appointment.AppointmentDTO;
import com.nln.hospitalsystem.dto.appointment.AppointmentMapper;
import com.nln.hospitalsystem.dto.dashboard.AppointmentChartDTO;
import com.nln.hospitalsystem.dto.dashboard.AppointmentStatusStatsDTO;
import com.nln.hospitalsystem.dto.dashboard.DashboardDTO;
import com.nln.hospitalsystem.dto.dashboard.WeeklyAppointmentDTO;
import com.nln.hospitalsystem.entity.Appointment;
import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.repository.*;
import com.nln.hospitalsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<AppointmentChartDTO> getStatsByHour(LocalDate date, String shift) {
        LocalTime start;
        LocalTime end;

        switch (shift.toLowerCase()) {
            case "morning" -> {
                start = LocalTime.of(8, 0);
                end   = LocalTime.of(12, 0);
            }
            case "afternoon" -> {
                start = LocalTime.of(13, 0);
                end   = LocalTime.of(17, 0);
            }
            case "evening" -> {
                start = LocalTime.of(18, 0);
                end   = LocalTime.of(21, 0);
            }
            default -> { // all
                start = LocalTime.of(8, 0);
                end   = LocalTime.of(21, 0);
            }
        }

        List<Appointment> appointments = appointmentRepository.findAppointmentsByDateAndTimeRange(date, start, end);
        List<AppointmentChartDTO> result = new ArrayList<>();

        LocalTime cur = start;

        while (cur.isBefore(end)) {

            LocalTime next = cur.plusMinutes(30);

            // Tạo biến final để dùng trong lambda
            final LocalTime slotStart = cur;
            final LocalTime slotEnd = next;

            List<Appointment> slotAppointments = appointments.stream()
                    .filter(a -> {
                        LocalTime t = a.getSlot().getStartTime();
                        return !t.isBefore(slotStart) && t.isBefore(slotEnd);
                    })
                    .toList();

            long active = slotAppointments.stream()
                    .filter(a -> isActiveStatus(a.getStatus()))
                    .count();

            long cancelled = slotAppointments.stream()
                    .filter(a -> isCancelledStatus(a.getStatus()))
                    .count();

            result.add(
                    AppointmentChartDTO.builder()
                            .label(slotStart.toString())
                            .active(active)
                            .cancelled(cancelled)
                            .build()
            );

            cur = next;
        }

        return result;
    }

    @Override
    public List<AppointmentChartDTO> getStatsByWeekday(LocalDate date) {
        DayOfWeek dow = date.getDayOfWeek();
        LocalDate start = date.minusDays(dow.getValue() - 1); // Monday
        LocalDate end   = start.plusDays(6);                  // Sunday

        List<Appointment> apps = appointmentRepository.findAppointmentsInDateRange(start, end);

        Map<DayOfWeek, AppointmentChartDTO> map = new LinkedHashMap<>();

        for (int i = 1; i <= 7; i++) {
            DayOfWeek d = DayOfWeek.of(i);
            LocalDate currentDate = start.plusDays(i - 1);
            map.put(d,
                    AppointmentChartDTO.builder()
                            .label(convertDay(d) + " (" + format(currentDate) + ")") // T2, T3, ...
                            .active(0)
                            .cancelled(0)
                            .build()
            );
        }

        // Đếm số lịch hẹn từng ngày
        for (Appointment a : apps) {

            AppointmentStatus status = a.getStatus();

            LocalDate workDate =
                    a.getSlot()
                            .getDoctorSchedule()
                            .getSchedule()
                            .getWorkDate();

            DayOfWeek day = workDate.getDayOfWeek();
            AppointmentChartDTO dto = map.get(day);

            if (isActiveStatus(status)) {
                dto.setActive(dto.getActive() + 1);
            } else if (isCancelledStatus(status)) {
                dto.setCancelled(dto.getCancelled() + 1);
            }
        }

        return new ArrayList<>(map.values());
    }

    @Override
    public List<AppointmentChartDTO> getStatsByWeek(int month, int year) {
        LocalDate firstDay = LocalDate.of(year, month, 1);
        int lastDay = firstDay.lengthOfMonth();

        List<LocalDate[]> weeks = List.of(
                new LocalDate[]{ LocalDate.of(year, month, 1), LocalDate.of(year, month, 7) },
                new LocalDate[]{ LocalDate.of(year, month, 8), LocalDate.of(year, month, 14) },
                new LocalDate[]{ LocalDate.of(year, month, 15), LocalDate.of(year, month, 21) },
                new LocalDate[]{ LocalDate.of(year, month, 22), LocalDate.of(year, month, 28) },
                new LocalDate[]{ LocalDate.of(year, month, 29), LocalDate.of(year, month, lastDay) }
        );

        List<AppointmentChartDTO> result = new ArrayList<>();

        for (int i = 0; i < weeks.size(); i++) {
            LocalDate start = weeks.get(i)[0];
            LocalDate end   = weeks.get(i)[1];

            // Nếu tuần 5 không tồn tại (tháng 28 ngày)
            if (start.getDayOfMonth() > lastDay) break;

            List<Appointment> apps =
                    appointmentRepository.findAppointmentsInDateRange(start, end);

            long active = 0;
            long cancelled = 0;

            for (Appointment a : apps) {
                if (isActiveStatus(a.getStatus())) active++;
                if (isCancelledStatus(a.getStatus())) cancelled++;
            }

            result.add(
                    AppointmentChartDTO.builder()
                            .label("Tuần " + (i + 1) + " (" + format(start) + " - " + format(end) + ")")
                            .active(active)
                            .cancelled(cancelled)
                            .build()
            );
        }

        return result;
    }

    @Override
    public List<AppointmentChartDTO> getStatsByMonthDay(int month, int year) {
        List<Appointment> apps = appointmentRepository.findAppointmentsInMonth(month, year);

        // Lấy số ngày trong tháng
        YearMonth ym = YearMonth.of(year, month);
        int days = ym.lengthOfMonth();

        Map<Integer, AppointmentChartDTO> map = new LinkedHashMap<>();

        // Khởi tạo DTO cho từng ngày
        for (int d = 1; d <= days; d++) {
            map.put(d, AppointmentChartDTO.builder()
                    .label("" + d)
                    .active(0)
                    .cancelled(0)
                    .build());
        }

        // Đếm số lịch hẹn theo ngày
        for (Appointment a : apps) {

            LocalDate date = a.getSlot().getDoctorSchedule().getSchedule().getWorkDate();
            int day = date.getDayOfMonth();

            AppointmentChartDTO dto = map.get(day);

            if (isActiveStatus(a.getStatus())) {
                dto.setActive(dto.getActive() + 1);
            } else if (isCancelledStatus(a.getStatus())) {
                dto.setCancelled(dto.getCancelled() + 1);
            }
        }

        return new ArrayList<>(map.values());
    }

    @Override
    public List<AppointmentChartDTO> getStatsByYearMonth(int year) {
        List<Appointment> apps = appointmentRepository.findAppointmentsInYear(year);

        Map<Integer, AppointmentChartDTO> map = new LinkedHashMap<>();

        // Khởi tạo đủ 12 tháng
        for (int m = 1; m <= 12; m++) {
            map.put(m, AppointmentChartDTO.builder()
                    .label("Tháng" + m)
                    .active(0)
                    .cancelled(0)
                    .build());
        }

        for (Appointment a : apps) {
            int month = a.getSlot()
                    .getDoctorSchedule()
                    .getSchedule()
                    .getWorkDate()
                    .getMonthValue();

            AppointmentStatus st = a.getStatus();
            AppointmentChartDTO dto = map.get(month);

            if (isActiveStatus(st)) dto.setActive(dto.getActive() + 1);
            else if (isCancelledStatus(st)) dto.setCancelled(dto.getCancelled() + 1);
        }

        return new ArrayList<>(map.values());
    }

    @Override
    public List<AppointmentDTO> getLatestAppointments(int limit) {
        Pageable pageable = PageRequest.of(0, limit);

        List<Appointment> apps = appointmentRepository.findLatestAppointments(pageable);

        return apps.stream()
                .map(AppointmentMapper::toDTO)
                .toList();
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

    private boolean isActiveStatus(AppointmentStatus status) {
        return switch (status) {
            case PENDING, PENDING_VERIFICATION, CONFIRMED, COMPLETED, NO_SHOW -> true;
            default -> false;
        };
    }

    private boolean isCancelledStatus(AppointmentStatus status) {
        return switch (status) {
            case REJECTED, CANCELLED_BY_PATIENT, CANCELLED_BY_DOCTOR, CANCELLED_BY_ADMIN -> true;
            default -> false;
        };
    }

    private String format(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

}
