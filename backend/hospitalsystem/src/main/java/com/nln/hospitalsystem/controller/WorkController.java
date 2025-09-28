package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.work.WorkDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.work.WorkRequest;
import com.nln.hospitalsystem.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/work")
public class WorkController {
    @Autowired
    private WorkService workService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody WorkRequest request) {
        workService.createWork(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<WorkDTO>>> getAll(@RequestParam(required = false) Integer specialtyID) {
        List<WorkDTO> dto;

        dto = workService.getAllWorkShift(specialtyID);

        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

}
