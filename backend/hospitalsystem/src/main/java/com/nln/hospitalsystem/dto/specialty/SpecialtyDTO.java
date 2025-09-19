package com.nln.hospitalsystem.dto.specialty;

import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SpecialtyDTO {
    private Integer id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
}
