package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import com.nln.hospitalsystem.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping
    public ResponseEntity<ResponseData<TagDTO>> create(@RequestBody String request) {
        TagDTO dto = tagService.create(request);
        return ResponseEntity.ok(ResponseData.created(dto, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<TagDTO>>> getAll() {
        List<TagDTO> dto = tagService.findTags();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<TagDTO>> getById(@PathVariable Long id) {
        TagDTO category = tagService.findById(id);
        return ResponseEntity.ok(ResponseData.success(category, "get successfully"));
    }


    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<TagDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<TagDTO> result = tagService.importTags(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<TagDTO>> update(
            @PathVariable Long id,
            @RequestBody String request) {
        TagDTO dto = tagService.update(id, request);
        return ResponseEntity.ok(ResponseData.success(dto, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> delete(@PathVariable Long id) {
        tagService.delete(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseData<Long>> getCount() {
        long count = tagService.countTags();
        return ResponseEntity.ok(ResponseData.success(count, "Get count successfully"));
    }
}