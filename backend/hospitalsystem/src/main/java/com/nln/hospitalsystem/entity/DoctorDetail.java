package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class DoctorDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="doctor_id", nullable = false, unique = true)
    private Doctor doctor;

    // Giới thiệu chung (40 năm kinh nghiệm, chuyên khoa gì,…)
    @Lob
    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    // Phần "Khám và điều trị"
    @Lob
    @Column(name = "specialties", columnDefinition = "TEXT")
    private String specialties;

    // Phần "Quá trình công tác"
    @Lob
    @Column(name = "work_experience", columnDefinition = "TEXT")
    private String workExperience;

    // Phần "Tham gia các chuyên đề / chương trình sức khỏe"
    @Lob
    @Column(name = "health_programs", columnDefinition = "TEXT")
    private String healthPrograms;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}