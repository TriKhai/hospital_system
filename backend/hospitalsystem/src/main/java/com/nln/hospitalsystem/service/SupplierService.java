package com.nln.hospitalsystem.service;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;

import java.util.List;

public interface SupplierService {
    List<SupplierDTO> getAllSuppliers();
    SupplierDTO createSupplier(SupplierRequest request);
    SupplierDTO updateSupplier(Integer id, SupplierRequest request);
    void deleteSupplier(Integer id);
    Long countSuppliers();
}
