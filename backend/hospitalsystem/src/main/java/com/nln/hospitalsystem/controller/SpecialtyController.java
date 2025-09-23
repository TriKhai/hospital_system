package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.specialty.SpecialtyRequest;
import com.nln.hospitalsystem.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specialty")
public class SpecialtyController {
    @Autowired
    private SpecialtyService specialtyService;

    @PostMapping
    public ResponseEntity<ResponseData<SpecialtyDTO>> create(@RequestBody SpecialtyRequest request){
        // Nếu có lỗi, service sẽ ném RuntimeException, IllegalArgumentException hoặc EntityNotFoundException
        SpecialtyDTO dto = specialtyService.createSpecialty(request);
        return ResponseEntity.ok(ResponseData.success(dto, "Create specialty successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<SpecialtyDTO>>> getAll() {
        List<SpecialtyDTO> specialties = specialtyService.getAllSpecialty();
        return ResponseEntity.ok(ResponseData.success(specialties, "Get specialties successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<SpecialtyDTO>> update(
            @PathVariable Integer id,
            @RequestBody SpecialtyRequest request) {
        SpecialtyDTO dto = specialtyService.updateSpecialty(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update specialty successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> delete(@PathVariable Integer id) {
        specialtyService.deleteSpecialty(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete specialty successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = specialtyService.countAllSpecialty();
        return ResponseEntity.ok(ResponseData.success(count, "Count specialty"));
    }

}
