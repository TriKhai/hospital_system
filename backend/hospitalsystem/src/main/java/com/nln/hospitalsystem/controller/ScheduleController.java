package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.schedule.ScheduleDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleByDocRequest;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;
import com.nln.hospitalsystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody ScheduleRequest request) {
        scheduleService.createSchedule(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<ScheduleDTO>>> getAll(@RequestParam(required = false) Integer specialtyID) {
        List<ScheduleDTO> dto;

        dto = scheduleService.getSchedulesbySchedule(specialtyID);

        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @PutMapping
    public ResponseEntity<ResponseData<List<Void>>> update(@RequestBody ScheduleRequest request) {

        scheduleService.updateSchedule(request);

        return ResponseEntity.ok(ResponseData.success(null, "update successfully"));
    }

    @PostMapping("/doctor")
    public ResponseEntity<ResponseData<Void>> createByDoctor(@RequestBody ScheduleByDocRequest request) {
        scheduleService.createScheduleByDoctor(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @DeleteMapping("/{doctorId}/{scheduleId}")
    public ResponseEntity<ResponseData<List<Void>>> delete(@PathVariable Integer doctorId, @PathVariable Long scheduleId) {

        scheduleService.delelteSchedule(doctorId, scheduleId);

        return ResponseEntity.ok(ResponseData.success(null, "delete successfully"));
    }
}
