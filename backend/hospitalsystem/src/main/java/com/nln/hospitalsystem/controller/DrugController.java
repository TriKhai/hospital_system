package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.DrugRequest;
import com.nln.hospitalsystem.payload.request.specialty.SpecialtyRequest;
import com.nln.hospitalsystem.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/drug")
public class DrugController {

    @Autowired
    private DrugService drugService;

    @PostMapping
    public ResponseEntity<ResponseData<DrugDTO>> create(@ModelAttribute DrugRequest request) {
        DrugDTO dto = drugService.createDrug(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<DrugDTO>>> getAll() {
        List<DrugDTO> drugs = drugService.getAllDrugs();
        return ResponseEntity.ok(ResponseData.success(drugs, "Get all successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<DrugDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<DrugDTO> result = drugService.importDrug(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<DrugDTO>> update(
            @PathVariable Integer id,
            @ModelAttribute DrugRequest request) {
        DrugDTO dto = drugService.updateDrug(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update drug successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> delete(@PathVariable Integer id) {
        drugService.deleteDrug(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete drug successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = drugService.countAllDrugs();
        return ResponseEntity.ok(ResponseData.success(count, "Count drugs"));
    }
}
