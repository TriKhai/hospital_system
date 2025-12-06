package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.dto.doctorSchedule.DoctorScheduleDTO;
import com.nln.hospitalsystem.enums.Shifts;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.service.DoctorScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor-schedule")
public class DoctorScheduleController {
    @Autowired
    private DoctorScheduleService doctorScheduleService;

    @GetMapping
    public ResponseEntity<ResponseData<List<DoctorScheduleDTO>>> getAll() {
        List<DoctorScheduleDTO> dto = doctorScheduleService.getAll();
        return ResponseEntity.ok(ResponseData.success(dto, "Get doctor schedule successfully"));
    }

    @PatchMapping("/{doctorId}/{scheduleId}/{shiftType}/approve")
    public ResponseEntity<ResponseData<List<Void>>> approveSchedule( @PathVariable Integer doctorId,
                                                                     @PathVariable Long scheduleId,
                                                                     @PathVariable Shifts shiftType) {
        doctorScheduleService.approveSchedule(doctorId, scheduleId, shiftType);
        return ResponseEntity.ok(ResponseData.success(null, "Approve schedule successfully"));
    }

    @PatchMapping("/{doctorId}/{scheduleId}/{shiftType}/cancel")
    public ResponseEntity<ResponseData<List<Void>>> cancelSchedule( @PathVariable Integer doctorId,
                                                                     @PathVariable Long scheduleId,
                                                                    @PathVariable Shifts shiftType){
        doctorScheduleService.cancelSchedule(doctorId, scheduleId, shiftType);
        return ResponseEntity.ok(ResponseData.success(null, "Cancel schedule successfully"));
    }
}
