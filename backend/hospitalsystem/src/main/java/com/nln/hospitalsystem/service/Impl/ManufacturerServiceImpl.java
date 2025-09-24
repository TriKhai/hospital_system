package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.dto.manufacturer.ManufacturerMapper;
import com.nln.hospitalsystem.entity.Manufacturer;
import com.nln.hospitalsystem.payload.request.drug.ManufacturerRequest;
import com.nln.hospitalsystem.repository.ManufacturerRepository;
import com.nln.hospitalsystem.service.ManufacturerService;
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

@Service
public class ManufacturerServiceImpl implements ManufacturerService {
    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Override
    public List<ManufacturerDTO> getAllManufacturers() {
        return manufacturerRepository.findAll()
                .stream()
                .map(ManufacturerMapper::toDTO)
                .toList();
    }

    @Override
    public ManufacturerDTO createManufacturer(ManufacturerRequest request) {
        Manufacturer entity = Manufacturer.builder()
                .name(request.getName())
                .country(request.getCountry())
                .build();

        Manufacturer saved = manufacturerRepository.save(entity);
        return ManufacturerMapper.toDTO(saved);
    }

    @Override
    public ManufacturerDTO updateManufacturer(Integer id, ManufacturerRequest request) {
        Manufacturer existing = manufacturerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manufacturer not found"));
        existing.setName(request.getName());
        existing.setCountry(request.getCountry());

        Manufacturer updated = manufacturerRepository.save(existing);
        return ManufacturerMapper.toDTO(updated);
    }

    @Override
    public void deleteManufacturer(Integer id) {
        Manufacturer existing = manufacturerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manufacturer not found"));
        manufacturerRepository.delete(existing);
    }

    @Override
    public Long countManufacturers() {
        return manufacturerRepository.count();
    }

    @Override
    public List<ManufacturerDTO> importManufacturer(MultipartFile file) {
        List<Manufacturer> manufacturers = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Manufacturer manufacturer = Manufacturer.builder()
                        .name(record.get("name"))
                        .country(record.get("country"))
                        .build();
                manufacturers.add(manufacturer);
            }

            return manufacturerRepository.saveAll(manufacturers)
                    .stream()
                    .map(ManufacturerMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage());
        }
    }
}
