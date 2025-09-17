package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "doctor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name="email", unique = true)
    private String email;

    @Column(name="phone", unique = true)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "birthDay")
    private LocalDate birthDay;

    @Column(name = "gender")
    private Boolean gender = true; // true = male, false = female

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "consultation_fee")
    private BigDecimal consultationFee;

    // ở ERD để Date nhưng thực chất "working_hours" thường là time → dùng LocalTime
    @Column(name = "working_hours")
    private LocalTime workingHours;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "degree")
    private String degree;

    @Column(name = "position")
    private String position;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Quan hệ 1-1 với Account
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    // Nhieu doctor thuoc 1 specialty
    @ManyToOne
    @JoinColumn(name = "specialty_id")
    private Specialty specialty;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments = new ArrayList<>();;

}