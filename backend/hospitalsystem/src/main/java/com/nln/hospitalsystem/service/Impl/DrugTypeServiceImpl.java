package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.dto.drugType.DrugTypeMapper;
import com.nln.hospitalsystem.entity.DrugType;
import com.nln.hospitalsystem.payload.request.drug.DrugTypeRequest;
import com.nln.hospitalsystem.repository.DrugTypeRepository;
import com.nln.hospitalsystem.service.DrugTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugTypeServiceImpl implements DrugTypeService {

    @Autowired
    private DrugTypeRepository drugTypeRepository;

    @Override
    public List<DrugTypeDTO> getAllDrugType() {
        return drugTypeRepository.findAll()
                .stream()
                .map(DrugTypeMapper::toDTO)
                .toList();
    }

    @Override
    public DrugTypeDTO createDrugType(DrugTypeRequest request) {
        DrugType entity = DrugType.builder()
                .name(request.getName())
                .unit(request.getUnit())
                .build();
        DrugType saved = drugTypeRepository.save(entity);
        return DrugTypeMapper.toDTO(saved);
    }

    @Override
    public DrugTypeDTO updateDrugType(Integer id, DrugTypeRequest request) {
        DrugType existing = drugTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drug type with id " + id + " not found!"));

        existing.setName(request.getName());
        existing.setUnit(request.getUnit());

        DrugType updated = drugTypeRepository.save(existing);
        return DrugTypeMapper.toDTO(updated);
    }

    @Override
    public void deleteDrugType(Integer id) {
        DrugType existing = drugTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drug type with id " + id + " not found!"));
        drugTypeRepository.delete(existing);
    }

    @Override
    public Long countDrugType() {
        return drugTypeRepository.count();
    }
}
