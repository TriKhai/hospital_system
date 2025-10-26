package com.nln.hospitalsystem.dto.tag;

import com.nln.hospitalsystem.entity.Tag;

public class TagMapper {
    public static TagDTO toDTO(Tag tag) {
        if (tag == null) return null;
        return TagDTO.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }
}
