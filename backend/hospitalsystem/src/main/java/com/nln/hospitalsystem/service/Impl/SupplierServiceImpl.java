package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.supplier.SupplierDTO;
import com.nln.hospitalsystem.dto.supplier.SupplierMapper;
import com.nln.hospitalsystem.entity.Supplier;
import com.nln.hospitalsystem.payload.request.drug.SupplierRequest;
import com.nln.hospitalsystem.repository.SupplierRepository;
import com.nln.hospitalsystem.service.SupplierService;
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

    @Override
    public List<SupplierDTO> importSupplier(MultipartFile file) {
        List<Supplier> suppliers = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Supplier supplier = Supplier.builder()
                        .name(record.get("name"))
                        .address(record.get("address"))
                        .phone(record.get("phone"))
                        .email(record.get("email"))
                        .build();
                suppliers.add(supplier);
            }

            return supplierRepository.saveAll(suppliers)
                    .stream()
                    .map(SupplierMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage());
        }
    }
}
