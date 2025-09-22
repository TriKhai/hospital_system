package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.dto.manufacturer.ManufacturerMapper;
import com.nln.hospitalsystem.entity.Manufacturer;
import com.nln.hospitalsystem.payload.request.drug.ManufacturerRequest;
import com.nln.hospitalsystem.repository.ManufacturerRepository;
import com.nln.hospitalsystem.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
