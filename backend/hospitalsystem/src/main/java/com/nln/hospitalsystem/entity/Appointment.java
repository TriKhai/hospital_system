package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.AppointmentStatus;
import com.nln.hospitalsystem.enums.RecordStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)  // lưu chuỗi thay vì số
    @Column(name = "status", nullable = false, length = 20)
    private AppointmentStatus status;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Enumerated(EnumType.STRING)
    @Column(name = "del_status", nullable = false)
    private RecordStatus delStatus = RecordStatus.ACTIVE;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Mối quan hệ với Patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @OneToOne
    @JoinColumn(name = "slot_id", nullable = false, unique = true)
    private Slot slot;


//    @OneToOne(mappedBy = "appointment", fetch = FetchType.LAZY)
//    private MedicalRecord medicalRecord;


}