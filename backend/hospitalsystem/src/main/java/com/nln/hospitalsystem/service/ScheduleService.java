package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.schedule.ScheduleDTO;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleByDocRequest;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;

import java.util.List;

public interface ScheduleService {
    List<ScheduleDTO> getSchedulesbySchedule(Integer specialtyId);
    void createSchedule(ScheduleRequest scheduleRequest);
    void createScheduleByDoctor(ScheduleByDocRequest request);
    void updateSchedule(ScheduleRequest scheduleRequest);
    void delelteSchedule(Integer doctorId, Long scheduleId);
//    void approveSchedule(Integer doctorId, Long scheduleId);
}
