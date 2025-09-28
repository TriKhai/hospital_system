package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.work.WorkDTO;
import com.nln.hospitalsystem.payload.request.work.WorkRequest;

import java.util.List;

public interface WorkService {
    void createWork(WorkRequest request);
    List<WorkDTO> getAllWorkShift(Integer specialtyId);
}
