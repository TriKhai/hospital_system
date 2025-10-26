package com.nln.hospitalsystem.dto.blog;

import com.nln.hospitalsystem.dto.category.CategoryMapper;
import com.nln.hospitalsystem.dto.doctor.DoctorBlogDTO;
import com.nln.hospitalsystem.dto.doctor.DoctorBlogMapper;
import com.nln.hospitalsystem.dto.tag.TagMapper;
import com.nln.hospitalsystem.entity.Blog;

import java.util.stream.Collectors;

public class BlogMapper {
    public static BlogDTO toDTO(Blog blog) {
        if (blog == null) return null;

        return BlogDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .description(blog.getDescription())
                .thumbnail(blog.getThumbnail())
                .status(blog.getStatus())
                .category(CategoryMapper.toDTO(blog.getCategory()))
                .author(DoctorBlogMapper.toDTO(blog.getAuthor()))
                .tags(blog.getTags() != null
                        ? blog.getTags().stream().map(TagMapper::toDTO).collect(Collectors.toList())
                        : null)
                .likes(blog.getLikes())
                .content(blog.getContent())
                .relatedLink(blog.getRelatedLink())
                .publishedAt(blog.getPublishedAt())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .build();
    }
}
