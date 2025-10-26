package com.nln.hospitalsystem.service.Impl;

import com.nln.hospitalsystem.dto.blog.BlogDTO;
import com.nln.hospitalsystem.dto.blog.BlogMapper;
import com.nln.hospitalsystem.entity.Blog;
import com.nln.hospitalsystem.entity.Category;
import com.nln.hospitalsystem.entity.Doctor;
import com.nln.hospitalsystem.entity.Tag;
import com.nln.hospitalsystem.enums.BlogStatus;
import com.nln.hospitalsystem.payload.request.blog.BlogRequest;
import com.nln.hospitalsystem.repository.BlogRepository;
import com.nln.hospitalsystem.repository.CategoryRepository;
import com.nln.hospitalsystem.repository.DoctorRepository;
import com.nln.hospitalsystem.repository.TagRepository;
import com.nln.hospitalsystem.service.BlogService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public List<BlogDTO> findAll() {
        return blogRepository.findAll()
                .stream()
                .map(BlogMapper::toDTO)
                .toList();
    }

    @Override
    public List<BlogDTO> findByStatus(BlogStatus status) {
        return blogRepository.findByStatus(status)
                .stream()
                .map(BlogMapper::toDTO)
                .toList();
    }

    @Override
    public BlogDTO findById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Khong tim thay bai viet voi ID: " + id));
        return BlogMapper.toDTO(blog);
    }

    @Override
    public void create(BlogRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + request.getCategoryId()));

        Doctor author = doctorRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bác sĩ với ID: " + request.getAuthorId()));

        List<Tag> tags = tagRepository.findAllById(request.getTagIds());

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .thumbnail(request.getThumbnail())
                .category(category)
                .author(author)
                .content(request.getContent())
                .relatedLink(request.getRelatedLink())
                .tags(tags)
                .status(BlogStatus.PENDING) // ❗Mặc định là chờ duyệt
                .likes(0)
                .build();

//        Blog savedBlog = blogRepository.save(blog);
        blogRepository.save(blog);
    }

    @Override
    public void update(Long id, BlogRequest dto) {

    }

    @Override
    public void delete(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Khong tim thay bai viet voi ID: " + id));
        blogRepository.delete(blog);
    }

    @Override
    public List<BlogDTO> importBlogs(MultipartFile file) {
        List<Blog> blogs = new ArrayList<>();
        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                // 1️⃣ Lấy category
                Category category = categoryRepository.findById(Long.parseLong(record.get("categoryId")))
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy category ID: " + record.get("categoryId")));

                // 2️⃣ Lấy author (doctor)
                Doctor author = doctorRepository.findById(Integer.parseInt(record.get("authorId")))
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy doctor ID: " + record.get("authorId")));

                // 3️⃣ Lấy tag list
                List<Tag> tags = new ArrayList<>();
                String tagIdsStr = record.get("tagIds");
                if (tagIdsStr != null && !tagIdsStr.isEmpty()) {
                    List<Long> tagIds = Arrays.stream(tagIdsStr.split(","))
                            .map(String::trim)
                            .map(Long::parseLong)
                            .toList();
                    tags = tagRepository.findAllById(tagIds);
                }

                // 4️⃣ Tạo blog
                Blog blog = Blog.builder()
                        .title(record.get("title"))
                        .description(record.get("description"))
                        .thumbnail(record.get("thumbnail"))
                        .relatedLink(record.get("relatedLink"))
                        .status(BlogStatus.valueOf(record.get("status").toUpperCase()))
                        .likes(Integer.parseInt(record.get("likes")))
                        .category(category)
                        .author(author)
                        .tags(tags)
                        .content(record.get("content"))
                        .publishedAt(LocalDateTime.now())
                        .build();

                blogs.add(blog);
            }

            // 5️⃣ Lưu tất cả và trả về DTOs
            return blogRepository.saveAll(blogs)
                    .stream()
                    .map(BlogMapper::toDTO)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi đọc CSV: " + e.getMessage(), e);
        }
    }
}
