package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.entity.key.PrescriptionDetailKey;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "prescription_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDetail {
    @EmbeddedId
    PrescriptionDetailKey prescriptionDetailKey;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "dosage")
    private String dosage;

    @Column(name = "instructions", columnDefinition = "TEXT")
    private String instructions;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Quan hệ nhiều prescription_detail thuộc 1 prescription
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", insertable = false, updatable = false)
    private Prescription prescription;

    // Quan hệ nhiều prescription_detail thuộc 1 drugs
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drug_id", insertable = false, updatable = false)
    private Drug drug;
}