package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medical_record")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Quan hệ 1-1 với Appointment
    @OneToOne
    @JoinColumn(name = "appointment_id", unique = true)
    private Appointment appointment;

    @OneToOne(mappedBy = "medicalRecord", fetch = FetchType.LAZY)
    private Prescription prescription;
}