package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.service.FileService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileServiceImpl implements FileService {

    @Value("${fileUpload.rootPath}")
    private String rootPath;

    private Path patientPath;
    private Path doctorPath;

    @PostConstruct
    public void init(){
        System.out.println("rootPath " + rootPath);
        System.out.println("root " + patientPath);
        try {
            patientPath = Paths.get(rootPath, "patient");
            Files.createDirectories(patientPath);
            System.out.println("root" + patientPath);
        } catch (Exception e) {
            throw new RuntimeException("Unable to create upload folders", e);
        }
    }

    private Path resolvePath(FileCategory category) {
        return switch (category) {
            case PATIENT -> patientPath;
            case DOCTOR  -> doctorPath;
        };
    }

    @Override
    public String createNameFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new RuntimeException("File name is null");
        }
        String timestamp = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")
                .format(LocalDateTime.now());
        String cleanName = originalFileName.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        System.out.println("Creating file " + timestamp + "_" + cleanName);
        return timestamp + "_" + cleanName;
    }

    @Override
    public boolean saveFile(MultipartFile file, String fileName, FileCategory category) {
        try {
            Path targetDir = resolvePath(category);
            Files.copy(file.getInputStream(), targetDir.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error saving file", e);
        }
    }

    @Override
    public boolean deleteFile(String fileName, FileCategory category) {
        try {
            Path filePath = resolvePath(category).resolve(fileName);
            return Files.deleteIfExists(filePath);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting file", e);
        }
    }

    @Override
    public Resource loadFile(String fileName, FileCategory category) {
        System.out.println("fileName " + fileName);
        try {
            Path filePath = resolvePath(category).resolve(fileName).normalize();
            System.out.println("filePath " + filePath);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading file: " + fileName, e);
        }
    }
}
