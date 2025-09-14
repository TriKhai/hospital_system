package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@EntityListeners(AuditingEntityListener.class)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="username", unique = true)
    private String username;

    @Column(name="password_hash")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

//    @CreatedDate
//    @Column(updatable = false)
//    private LocalDateTime createdAt;
//
//    @LastModifiedDate
//    private LocalDateTime updatedAt;

    public enum Role {
        DOCTOR, PATIENT, PHARMACIST, ADMIN
    }

    @OneToOne(mappedBy = "account", fetch = FetchType.LAZY)
    private Doctor doctor;

    @OneToOne(mappedBy = "account", fetch = FetchType.LAZY)
    private Patient patient;

}
