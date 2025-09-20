package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.department.DepartmentRequest;
import com.nln.hospitalsystem.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<ResponseData<DepartmentDTO>> create(@RequestBody DepartmentRequest request) {
        DepartmentDTO dto = departmentService.createDepartment(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<DepartmentDTO>>> getAll() {
        List<DepartmentDTO> departments = departmentService.getAllDepartment();
        return ResponseEntity.ok(ResponseData.success(departments, "Get departments successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<DepartmentDTO>> update(
            @PathVariable Integer id,
            @RequestBody DepartmentRequest request) {
        DepartmentDTO dto = departmentService.updateDepartment(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update department successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<DepartmentDTO>> delete(@PathVariable Integer id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete department successfully"));
    }



//    @GetMapping("/{id}")
//    public DepartmentDTO getById(@PathVariable Integer id) {
//        return departmentService.getDepartmentById(id);
//    }
}
