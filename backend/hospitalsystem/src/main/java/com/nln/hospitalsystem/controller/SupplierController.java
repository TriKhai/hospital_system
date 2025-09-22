package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
import com.nln.hospitalsystem.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<ResponseData<SupplierDTO>> create(@RequestBody SupplierRequest request) {
        SupplierDTO dto = supplierService.createSupplier(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<SupplierDTO>>> getAll() {
        List<SupplierDTO> dto = supplierService.getAllSuppliers();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<SupplierDTO>> update(
            @PathVariable Integer id,
            @RequestBody SupplierRequest request) {
        SupplierDTO dto = supplierService.updateSupplier(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<SupplierDTO>> delete(@PathVariable Integer id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = supplierService.countSuppliers();
        return ResponseEntity.ok(ResponseData.success(count, "Get count successfully"));
    }
}
