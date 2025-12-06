package com.nln.hospitalsystem.payload.request.blog;

import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogFormRequest {
    private String title;

    private String description;

    private String thumbnail;

    private Long categoryId;

    private String content;

    private String relatedLink;

    private List<Long> tagIds;

}
