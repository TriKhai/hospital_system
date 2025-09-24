package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.drug.DrugDTO;
import com.nln.hospitalsystem.dto.drug.DrugMapper;
import com.nln.hospitalsystem.entity.Drug;
import com.nln.hospitalsystem.entity.DrugType;
import com.nln.hospitalsystem.entity.Manufacturer;
import com.nln.hospitalsystem.entity.Supplier;
import com.nln.hospitalsystem.enums.FileCategory;
import com.nln.hospitalsystem.payload.request.drug.DrugRequest;
import com.nln.hospitalsystem.repository.DrugRepository;
import com.nln.hospitalsystem.repository.DrugTypeRepository;
import com.nln.hospitalsystem.repository.ManufacturerRepository;
import com.nln.hospitalsystem.repository.SupplierRepository;
import com.nln.hospitalsystem.service.DrugService;
import com.nln.hospitalsystem.service.FileService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugRepository drugRepository;

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private DrugTypeRepository drugtypeRepository;

    @Autowired
    private FileService fileService;

    @Override
    public DrugDTO createDrug(DrugRequest request) {
        try {
            Drug drug = Drug.builder()
                    .name(request.getName())
                    .price(request.getPrice())
                    .stock(request.getStock())
                    .effects(request.getEffects())
                    .expiredAt(request.getExpiredAt())
                    .usageInstructions(request.getUsageInstructions())
                    .build();

            drug.setManufacturer(
                    manufacturerRepository.findById(request.getManufacturerId())
                            .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found"))
            );

            drug.setSupplier(
                    supplierRepository.findById(request.getSupplierId())
                            .orElseThrow(() -> new EntityNotFoundException("Supplier not found"))
            );

            drug.setDrugType(
                    drugtypeRepository.findById(request.getDrugTypeId())
                            .orElseThrow(() -> new EntityNotFoundException("DrugType not found"))
            );

            handleImageUpload(request.getImage(), drug);

            Drug saved = drugRepository.save(drug);
            return DrugMapper.toDTO(saved);

        } catch (Exception e) {
            throw new RuntimeException("Error creating drug: " + e.getMessage(), e);
        }
    }

    @Override
    public List<DrugDTO> getAllDrugs() {
        List<Drug> drugs = drugRepository.findAll();
        return drugs.stream()
                .map(DrugMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DrugDTO updateDrug(Integer id, DrugRequest request) {
        Drug drug = drugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drug not found with id: " + id));

        drug.setName(request.getName());
        drug.setPrice(request.getPrice());
        drug.setStock(request.getStock());
        drug.setExpiredAt(request.getExpiredAt());
        drug.setUsageInstructions(request.getUsageInstructions());
        drug.setEffects(request.getEffects());

        drug.setManufacturer(
                manufacturerRepository.findById(request.getManufacturerId())
                        .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found"))
        );

        drug.setSupplier(
                supplierRepository.findById(request.getSupplierId())
                        .orElseThrow(() -> new EntityNotFoundException("Supplier not found"))
        );

        drug.setDrugType(
                drugtypeRepository.findById(request.getDrugTypeId())
                        .orElseThrow(() -> new EntityNotFoundException("DrugType not found"))
        );

        // Xử lý ảnh: nếu có ảnh mới thì xóa ảnh cũ và lưu ảnh mới
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            if (drug.getImageUrl() != null) {
                String oldFileName = java.nio.file.Path.of(drug.getImageUrl()).getFileName().toString();
                fileService.deleteFile(oldFileName, FileCategory.DRUG);
            }
            handleImageUpload(request.getImage(), drug);
        }

        Drug updated = drugRepository.save(drug);
        return DrugMapper.toDTO(updated);
    }

    @Override
    public void deleteDrug(Integer id) {
        Drug drug = drugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drug not found with id: " + id));

        // Xóa ảnh trong storage nếu có
        if (drug.getImageUrl() != null) {
            String oldFileName = java.nio.file.Path.of(drug.getImageUrl()).getFileName().toString();
            fileService.deleteFile(oldFileName, FileCategory.DRUG);
        }

        drugRepository.delete(drug);
    }

    @Override
    public Long countAllDrugs() {
        return drugRepository.count();
    }

    @Override
    public List<DrugDTO> importDrug(MultipartFile file) {
        List<Drug> drugs = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Manufacturer manufacturer = manufacturerRepository.findById(
                                Integer.parseInt(record.get("manufacturerId")))
                        .orElseThrow(() -> new RuntimeException(
                                "Manufacturer ID " + record.get("manufacturerId") + " not found"));

                Supplier supplier = supplierRepository.findById(
                                Integer.parseInt(record.get("supplierId")))
                        .orElseThrow(() -> new RuntimeException(
                                "Supplier ID " + record.get("supplierId") + " not found"));

                DrugType drugType = drugtypeRepository.findById(
                                Integer.parseInt(record.get("drugTypeId")))
                        .orElseThrow(() -> new RuntimeException(
                                "DrugType ID " + record.get("drugTypeId") + " not found"));

                Drug drug = Drug.builder()
                        .name(record.get("name"))
                        .price(new BigDecimal(record.get("price")))
                        .stock(Integer.parseInt(record.get("stock")))
                        .expiredAt(LocalDate.parse(record.get("expiredAt"))) // format yyyy-MM-dd
                        .usageInstructions(record.get("usageInstructions"))
                        .effects(record.get("effects"))
                        .manufacturer(manufacturer)
                        .supplier(supplier)
                        .drugType(drugType)
                        // image: không import từ CSV -> để null hoặc xử lý mặc định
                        .build();

                drugs.add(drug);
            }

            return drugRepository.saveAll(drugs)
                    .stream()
                    .map(DrugMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage(), e);
        }
    }

    private void handleImageUpload(MultipartFile image, Drug drug) {
        if (image == null || image.isEmpty()) return;

        String fileName = fileService.createNameFile(image);
        fileService.saveFile(image, fileName, FileCategory.DRUG);
        drug.setImageUrl(fileName);
    }
}
