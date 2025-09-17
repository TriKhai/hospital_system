package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.enums.FileCategory;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String createNameFile(MultipartFile file);
    boolean saveFile(MultipartFile file, String fileName, FileCategory category);
    boolean deleteFile(String fileName, FileCategory category);
    Resource loadFile(String fileName, FileCategory category);
}
