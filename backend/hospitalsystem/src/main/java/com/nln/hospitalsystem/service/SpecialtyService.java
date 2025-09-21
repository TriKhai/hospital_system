package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.specialty.SpecialtyDTO;
import com.nln.hospitalsystem.entity.Specialty;
import com.nln.hospitalsystem.payload.request.specialty.SpecialtyRequest;

import java.util.List;

public interface SpecialtyService {
    SpecialtyDTO createSpecialty(SpecialtyRequest request);
    SpecialtyDTO updateSpecialty(Integer id, SpecialtyRequest request);
    void deleteSpecialty(Integer id);
    List<SpecialtyDTO> getAllSpecialty();
    Long countAllSpecialty();
}
