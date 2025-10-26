package com.nln.hospitalsystem.dto.blog;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorBlogDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorLiteDTO;
import com.nln.hospitalsystem.dto.tag.TagDTO;
import com.nln.hospitalsystem.enums.BlogStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogDTO {

    private Long id;

    private String title;

    private String description;

    private BlogStatus status;

    private String thumbnail;

    private CategoryDTO category;

    private DoctorBlogDTO author;

    private int likes;

    private String relatedLink;

    private LocalDateTime publishedAt;

    private List<TagDTO> tags;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
