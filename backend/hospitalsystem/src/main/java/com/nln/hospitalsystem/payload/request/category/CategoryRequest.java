package com.nln.hospitalsystem.payload.request.category;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryRequest {
    private String name;
    private String description;
}
