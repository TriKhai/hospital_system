package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.staffSchedule.StaffScheduleDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
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
    public ResponseEntity<ResponseData<StaffScheduleDTO>> create(@RequestBody StaffScheduleRequest request) {
        StaffScheduleDTO dto = staffScheduleService.createStaffSchedule(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<StaffScheduleDTO>>> getAll() {
        List<StaffScheduleDTO> dto = staffScheduleService.getAllStaffSchedules();
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
