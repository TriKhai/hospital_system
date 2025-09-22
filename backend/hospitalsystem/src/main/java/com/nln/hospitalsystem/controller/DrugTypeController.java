package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.DrugTypeRequest;
import com.nln.hospitalsystem.service.DrugTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drug-type")
public class DrugTypeController {
    @Autowired
    private DrugTypeService drugTypeService;

    @PostMapping
    public ResponseEntity<ResponseData<DrugTypeDTO>> create(@RequestBody DrugTypeRequest request) {
        DrugTypeDTO dto = drugTypeService.createDrugType(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<DrugTypeDTO>>> getAll() {
        List<DrugTypeDTO> dto = drugTypeService.getAllDrugType();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<DrugTypeDTO>> update(
            @PathVariable Integer id,
            @RequestBody DrugTypeRequest request) {
        DrugTypeDTO dto = drugTypeService.updateDrugType(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<DrugTypeDTO>> delete(@PathVariable Integer id) {
        drugTypeService.deleteDrugType(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = drugTypeService.countDrugType();
        return ResponseEntity.ok(ResponseData.success(count, "Get count successfully"));
    }
}
