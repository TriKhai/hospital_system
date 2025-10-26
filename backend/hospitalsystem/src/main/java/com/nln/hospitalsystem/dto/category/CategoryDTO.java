package com.nln.hospitalsystem.dto.category;

import com.nln.hospitalsystem.entity.Blog;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
}
