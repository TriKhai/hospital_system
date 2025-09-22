package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.manufacturer.ManufacturerDTO;
import com.nln.hospitalsystem.payload.request.drug.ManufacturerRequest;

import java.util.List;

public interface ManufacturerService {
    List<ManufacturerDTO> getAllManufacturers();
    ManufacturerDTO createManufacturer(ManufacturerRequest request);
    ManufacturerDTO updateManufacturer(Integer id, ManufacturerRequest request);
    void deleteManufacturer(Integer id);
    Long countManufacturers();
}
