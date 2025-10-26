package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findCategories();
    CategoryDTO findById(Long id);
    void create(CategoryRequest request);
    void update(Long id, CategoryRequest request);
    void delete(Long id);
    List<CategoryDTO> importCategories(MultipartFile file);
}
