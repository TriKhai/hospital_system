package com.nln.hospitalsystem.dto.supplier;

import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDTO {
    private Integer id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private LocalDateTime createdAt;
}
