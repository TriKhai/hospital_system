package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.staffSchedule.ScheduleDTO;
import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
import com.nln.hospitalsystem.payload.request.schedule.ScheduleRequest;
import com.nln.hospitalsystem.payload.request.schedule.StaffScheduleRequest;
import com.nln.hospitalsystem.service.StaffScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/staff-schedule")
public class StaffScheduleController {

    @Autowired
    private StaffScheduleService staffScheduleService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody ScheduleRequest request) {
        staffScheduleService.createSchedule(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<ScheduleDTO>>> getAll(@RequestParam(required = false) Integer specialtyID) {
        List<ScheduleDTO> dto;

        if (specialtyID == null) {
            dto = staffScheduleService.getAllSchedule();
        } else {
            dto = staffScheduleService.getAllScheduleBySpecialty(specialtyID);
        }

        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<StaffScheduleDTO>> update(
            @PathVariable Integer id,
            @RequestBody StaffScheduleRequest request) {
        StaffScheduleDTO dto = staffScheduleService.updateStaffSchedule(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<StaffScheduleDTO>> delete(@PathVariable Integer id) {
        staffScheduleService.deleteStaffSchedule(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }
}
