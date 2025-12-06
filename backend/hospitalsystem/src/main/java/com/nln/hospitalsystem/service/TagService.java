package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.payload.request.category.CategoryRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TagService {
    List<TagDTO> findTags();

    List<TagDTO> importTags(MultipartFile file);

    TagDTO findById(Long id);
    TagDTO create(String txt);
    TagDTO update(Long id, String txt);
    void delete(Long id);
    Long countTags();
}
