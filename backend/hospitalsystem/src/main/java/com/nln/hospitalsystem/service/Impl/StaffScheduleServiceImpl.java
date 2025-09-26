package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.staffSchedule.ScheduleDTO;
import com.nln.hospitalsystem.dto.staffSchedule.ScheduleMapper;
import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleDTO;
import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleMapper;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.StaffSchedule;
import com.nln.hospitalsystem.enums.RepeatSchedule;
import com.nln.hospitalsystem.enums.Shifts;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;
import com.nln.hospitalsystem.payload.request.schedule.StaffScheduleRequest;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.repository.StaffScheduleRepository;
import com.nln.hospitalsystem.service.StaffScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffScheduleServiceImpl implements StaffScheduleService {

    @Autowired
    private StaffScheduleRepository staffScheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public List<StaffScheduleDTO> getAllStaffSchedules() {
        return staffScheduleRepository.findAll()
                .stream()
                .map(StaffScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StaffScheduleDTO createStaffSchedule(StaffScheduleRequest request) {
        try {
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with id: " + request.getDoctorId()));

            StaffSchedule schedule = StaffSchedule.builder()
                    .doctor(doctor)
                    .workDate(request.getWorkDate())
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .status(request.getStatus())
                    .build();

            StaffSchedule saved = staffScheduleRepository.save(schedule);
            return StaffScheduleMapper.toDTO(saved);
        } catch (Exception e) {
            throw new RuntimeException("Error creating schedule: " + e.getMessage(), e);
        }
    }

    @Override
    public StaffScheduleDTO updateStaffSchedule(Integer id, StaffScheduleRequest request) {
        try {
            StaffSchedule schedule = staffScheduleRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + id));

            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found with id: " + request.getDoctorId()));

            schedule.setDoctor(doctor);
            schedule.setWorkDate(request.getWorkDate());
            schedule.setStartTime(request.getStartTime());
            schedule.setEndTime(request.getEndTime());
            schedule.setStatus(request.getStatus());

            StaffSchedule updated = staffScheduleRepository.save(schedule);
            return StaffScheduleMapper.toDTO(updated);
        } catch (Exception e) {
            throw new RuntimeException("Error updating schedule: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteStaffSchedule(Integer id) {
        try {
            StaffSchedule schedule = staffScheduleRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Schedule not found with id: " + id));
            staffScheduleRepository.delete(schedule);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting schedule: " + e.getMessage(), e);
        }
    }

    @Override
    public void createSchedule(ScheduleRequest request) {
        // 1. Lấy bác sĩ
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with id: " + request.getDoctorId()));

        // 2. Lấy giờ bắt đầu và kết thúc ca
        LocalTime shiftStart = LocalTime.parse(request.getShift().getStart());
        LocalTime shiftEnd = LocalTime.parse(request.getShift().getEnd());

        // 3. Xác định số lần lặp mặc định theo repeat
        int repeatCount = switch (request.getRepeat()) {
            case DAILY -> 7;
            case WEEKLY -> 4;
            case MONTHLY -> 3;
            case NONE -> 1;
        };

        LocalDate baseDate = request.getWorkDate();

        // 4. Tạo schedule theo ngày lặp
        for (int i = 0; i < repeatCount; i++) {
            LocalDate targetDate = switch (request.getRepeat()) {
                case DAILY -> baseDate.plusDays(i);
                case WEEKLY -> baseDate.plusWeeks(i);
                case MONTHLY -> baseDate.plusMonths(i);
                case NONE -> baseDate;
            };

            // 5. Lấy danh sách slot đã tồn tại trong ngày để tránh trùng
            List<LocalTime> existingSlots = staffScheduleRepository
                    .findByDoctorAndWorkDate(doctor, targetDate)
                    .stream()
                    .map(StaffSchedule::getStartTime)
                    .toList();

            // 6. Tạo slot mới
            LocalTime slotStart = shiftStart;
            while (slotStart.isBefore(shiftEnd)) {
                LocalTime slotEnd = slotStart.plusMinutes(request.getSlotMinutes());
                if (!slotStart.isBefore(slotEnd)) break;

                if (!existingSlots.contains(slotStart)) {
                    StaffSchedule schedule = StaffSchedule.builder()
                            .doctor(doctor)
                            .workDate(targetDate)
                            .startTime(slotStart)
                            .endTime(slotEnd)
                            .status(request.getStatus())
                            .build();
                    staffScheduleRepository.save(schedule);
                }

                slotStart = slotEnd;
            }
        }
    }

    @Override
    public List<ScheduleDTO> getAllSchedule() {
        List<StaffSchedule> schedules = staffScheduleRepository.findAll();
        return schedules.stream()
                .map(ScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getAllScheduleBySpecialty(Integer specialtyID) {
        List<StaffSchedule> schedules = staffScheduleRepository.findByDoctor_SpecialtyId(specialtyID);
        return schedules.stream()
                .map(ScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }
}
