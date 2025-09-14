package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "prescription_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quantity;

    @Column(length = 100)
    private String dosage;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    // Quan hệ nhiều prescription_detail thuộc 1 prescription
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    // Quan hệ nhiều prescription_detail thuộc 1 drug
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drug_id", nullable = false)
    private Drug drug;
}