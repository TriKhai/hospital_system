package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
import com.nln.hospitalsystem.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody CategoryRequest request) {
        categoryService.create(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<CategoryDTO>>> getAll() {
        List<CategoryDTO> dto = categoryService.findCategories();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<CategoryDTO>> getById(@PathVariable Long id) {
        CategoryDTO category = categoryService.findById(id);
        return ResponseEntity.ok(ResponseData.success(category, "Update successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<CategoryDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<CategoryDTO> result = categoryService.importCategories(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> update(
            @PathVariable Long id,
            @RequestBody CategoryRequest request) {
        categoryService.update(id, request);
        return ResponseEntity.ok(ResponseData.success(null, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }
}
