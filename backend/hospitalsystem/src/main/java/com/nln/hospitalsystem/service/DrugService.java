package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.payload.request.drug.DrugRequest;

import java.util.List;

public interface DrugService {
    DrugDTO createDrug(DrugRequest request);
    List<DrugDTO> getAllDrugs();
    DrugDTO updateDrug(Integer id, DrugRequest drugRequest);
    void deleteDrug(Integer id);
    Long countAllDrugs();
}
