package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctorSchedule.DoctorScheduleDTO;

import java.util.List;

public interface DoctorScheduleService {
    List<DoctorScheduleDTO> getAll();
    void approveSchedule(Integer doctorId, Long scheduleId);
    void cancelSchedule(Integer doctorId, Long scheduleId);
}
