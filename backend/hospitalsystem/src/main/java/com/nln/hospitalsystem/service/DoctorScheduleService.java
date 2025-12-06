package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.doctorSchedule.DoctorScheduleDTO;
import com.nln.hospitalsystem.enums.Shifts;

import java.util.List;

public interface DoctorScheduleService {
    List<DoctorScheduleDTO> getAll();
    void approveSchedule(Integer doctorId, Long scheduleId, Shifts shift);
    void cancelSchedule(Integer doctorId, Long scheduleId, Shifts shift);
}
