package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleDTO;
import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleMapper;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.StaffSchedule;
import com.nln.hospitalsystem.payload.request.schedule.StaffScheduleRequest;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.repository.StaffScheduleRepository;
import com.nln.hospitalsystem.service.StaffScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
