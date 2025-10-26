package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.category.CategoryMapper;
import com.nln.hospitalsystem.entity.Category;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import com.nln.hospitalsystem.repository.CategoryRepository;
import com.nln.hospitalsystem.service.CategoryService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> findCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));
        return CategoryMapper.toDTO(category);
    }

    @Override
    public void create(CategoryRequest request) {
        Category category = CategoryMapper.toEntity(request);
        Category saved = categoryRepository.save(category);
//        return CategoryMapper.toDTO(saved);
    }

    @Override
    public void update(Long id, CategoryRequest request) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));

        CategoryMapper.updateEntity(existing, request);
        categoryRepository.save(existing);
//        return CategoryMapper.toDTO(categoryRepository.save(existing));
    }

    @Override
    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));

        // Kiểm tra xem có blog nào thuộc category này không
        if (!category.getBlogs().isEmpty()) {
            throw new RuntimeException("Không thể xoá danh mục vì vẫn còn bài viết bên trong.");
        }

        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryDTO> importCategories(MultipartFile file) {
        List<Category> categories = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Category category = Category.builder()
                        .name(record.get("name"))
                        .description(record.get("description"))
                        .build();
                categories.add(category);
            }

            return categoryRepository.saveAll(categories)
                    .stream()
                    .map(CategoryMapper::toDTO)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage());
        }
    }
}
