package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.tag.TagDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TagService {
    List<TagDTO> findTags();

    List<TagDTO> importTags(MultipartFile file);
}
