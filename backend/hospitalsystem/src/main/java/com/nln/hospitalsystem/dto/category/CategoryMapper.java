package com.nln.hospitalsystem.dto.category;

import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.entity.Category;
import com.nln.hospitalsystem.entity.Tag;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;

public class CategoryMapper {
    public static CategoryDTO toDTO(Category category) {
        if (category == null) return null;
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    public static Category toEntity(CategoryRequest request) {
        if (request == null) return null;
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }


    public static void updateEntity(Category category, CategoryRequest request) {
        if (category == null || request == null) return;
        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }
}
