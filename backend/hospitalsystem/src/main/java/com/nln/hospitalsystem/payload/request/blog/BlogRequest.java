package com.nln.hospitalsystem.payload.request.blog;

import com.nln.hospitalsystem.dto.category.CategoryDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorBlogDTO;
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
public class BlogRequest {
    private String title;

    private String description;

    private String thumbnail;

    private Long categoryId;

    private Integer authorId;

    private String content;

    private String relatedLink;

    private List<Long> tagIds;

}
