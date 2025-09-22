package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.drugType.DrugTypeDTO;
import com.nln.hospitalsystem.payload.request.drug.DrugTypeRequest;

import java.util.List;

public interface DrugTypeService {
    List<DrugTypeDTO> getAllDrugType();
    DrugTypeDTO createDrugType(DrugTypeRequest request);
    DrugTypeDTO updateDrugType(Integer id, DrugTypeRequest request);
    void deleteDrugType(Integer id);
    Long countDrugType();
}
