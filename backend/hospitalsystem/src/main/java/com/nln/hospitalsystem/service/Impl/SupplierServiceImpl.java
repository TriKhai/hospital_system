package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierMapper;
import com.nln.hospitalsystem.entity.Supplier;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
import com.nln.hospitalsystem.repository.SupplierRepository;
import com.nln.hospitalsystem.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::toDTO)
                .toList();
    }

    @Override
    public SupplierDTO createSupplier(SupplierRequest request) {
        Supplier entity = Supplier.builder()
                .name(request.getName())
                .address(request.getAddress())
                .phone(request.getPhone())
                .email(request.getEmail())
                .build();

        Supplier saved = supplierRepository.save(entity);
        return SupplierMapper.toDTO(saved);
    }

    @Override
    public SupplierDTO updateSupplier(Integer id, SupplierRequest request) {
        Supplier existing = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        existing.setName(request.getName());
        existing.setAddress(request.getAddress());
        existing.setPhone(request.getPhone());
        existing.setEmail(request.getEmail());

        Supplier updated = supplierRepository.save(existing);
        return SupplierMapper.toDTO(updated);
    }

    @Override
    public void deleteSupplier(Integer id) {
        Supplier existing = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierRepository.delete(existing);
    }

    @Override
    public Long countSuppliers() {
        return supplierRepository.count();
    }
}
