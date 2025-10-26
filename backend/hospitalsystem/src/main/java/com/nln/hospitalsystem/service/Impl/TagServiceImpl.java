package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.dto.tag.TagMapper;
import com.nln.hospitalsystem.entity.Tag;
import com.nln.hospitalsystem.repository.TagRepository;
import com.nln.hospitalsystem.service.TagService;
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
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<TagDTO> findTags() {
        return tagRepository.findAll()
                .stream()
                .map(TagMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TagDTO> importTags(MultipartFile file) {
        List<Tag> tags = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                Tag tag = Tag.builder()
                        .name(record.get("name"))
                        .build();
                tags.add(tag);
            }

            return tagRepository.saveAll(tags)
                    .stream()
                    .map(TagMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV Tag: " + e.getMessage());
        }
    }
}
