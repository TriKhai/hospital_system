package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.department.DepartmentDTO;
import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.DrugTypeRequest;
import com.nln.hospitalsystem.payload.request.drug.ManufacturerRequest;
import com.nln.hospitalsystem.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/manufacturer")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @PostMapping
    public ResponseEntity<ResponseData<ManufacturerDTO>> create(@RequestBody ManufacturerRequest request) {
        ManufacturerDTO dto = manufacturerService.createManufacturer(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<ManufacturerDTO>>> getAll() {
        List<ManufacturerDTO> dto = manufacturerService.getAllManufacturers();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<ManufacturerDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<ManufacturerDTO> result = manufacturerService.importManufacturer(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<ManufacturerDTO>> update(
            @PathVariable Integer id,
            @RequestBody ManufacturerRequest request) {
        ManufacturerDTO dto = manufacturerService.updateManufacturer(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<ManufacturerDTO>> delete(@PathVariable Integer id) {
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = manufacturerService.countManufacturers();
        return ResponseEntity.ok(ResponseData.success(count, "Get count successfully"));
    }

}
