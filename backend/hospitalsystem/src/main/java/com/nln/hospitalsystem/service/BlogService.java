package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.blog.BlogDTO;
import com.nln.hospitalsystem.enums.BlogStatus;
import com.nln.hospitalsystem.payload.request.blog.BlogRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BlogService {
    List<BlogDTO> findAll();
    List<BlogDTO> findByStatus(BlogStatus status);
    BlogDTO findById(Long id);
    void create(BlogRequest request);
    void update(Long id, BlogRequest request);
    void delete(Long id);
    List<BlogDTO> importBlogs(MultipartFile file);
}
