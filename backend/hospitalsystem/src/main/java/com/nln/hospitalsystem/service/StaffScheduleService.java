package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.staffSchedule.ScheduleDTO;
import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleDTO;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;
import com.nln.hospitalsystem.payload.request.schedule.StaffScheduleRequest;

import java.util.List;

public interface StaffScheduleService {
    List<StaffScheduleDTO> getAllStaffSchedules();
    StaffScheduleDTO createStaffSchedule(StaffScheduleRequest request);
    StaffScheduleDTO updateStaffSchedule(Integer id, StaffScheduleRequest request);
    void deleteStaffSchedule(Integer id);

    void createSchedule(ScheduleRequest request);
    List<ScheduleDTO> getAllSchedule();
    List<ScheduleDTO> getAllScheduleBySpecialty(Integer specialtyID);
}
