package com.nln.hospitalsystem.controller;

import com.nln.hospitalsystem.dto.blog.BlogDTO;
import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.enums.BlogStatus;
import com.nln.hospitalsystem.payload.ResponseData;
import com.nln.hospitalsystem.payload.request.blog.BlogRequest;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import com.nln.hospitalsystem.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<ResponseData<Void>> create(@RequestBody BlogRequest request) {
        blogService.create(request);
        return ResponseEntity.ok(ResponseData.created(null, "Created successfully"));
    }

    @GetMapping
    public ResponseEntity<ResponseData<List<BlogDTO>>> getAll() {
        List<BlogDTO> dto = blogService.findAll();
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @GetMapping("/public")
    public ResponseEntity<ResponseData<List<BlogDTO>>> getBlogsPublic() {
        List<BlogDTO> dto = blogService.findByStatus(BlogStatus.APPROVED);
        return ResponseEntity.ok(ResponseData.success(dto, "Get all successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<BlogDTO>> getById(@PathVariable Long id) {
        BlogDTO blog = blogService.findById(id);
        return ResponseEntity.ok(ResponseData.success(blog, "Update successfully"));
    }

    @PostMapping("/import")
    public ResponseEntity<ResponseData<List<BlogDTO>>> importCSV(@RequestParam("file") MultipartFile file) {
        List<BlogDTO> result = blogService.importBlogs(file);
        return ResponseEntity.ok(ResponseData.success(result, "Import thành công " + result.size() + " record"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> update(
            @PathVariable Long id,
            @RequestBody BlogRequest request) {
        blogService.update(id, request);
        return ResponseEntity.ok(ResponseData.success(null, "Update successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<Void>> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.ok(ResponseData.success(null, "Delete successfully"));
    }
}
