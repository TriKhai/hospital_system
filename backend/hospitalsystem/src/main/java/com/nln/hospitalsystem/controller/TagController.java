package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.payload.ResponseData;
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

    @GetMapping
    public ResponseEntity<ResponseData<List<TagDTO>>> getAll() {
        List<TagDTO> dto = tagService.findTags();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<TagDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<TagDTO> result = tagService.importTags(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

}
