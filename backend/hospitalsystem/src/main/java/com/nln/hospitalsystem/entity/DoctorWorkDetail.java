package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.entity.key.DoctorWorkDetailKey;
import com.nln.hospitalsystem.entity.key.DoctorWorkKey;
import com.nln.hospitalsystem.enums.RecordStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_workdetail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class DoctorWorkDetail {
    @EmbeddedId
    private DoctorWorkDetailKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("doctorId") // ánh xạ doctorId từ DoctorWorkKey
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("workDetailId") // ánh xạ workId từ DoctorWorkKey
    @JoinColumn(name = "work_detail_id", nullable = false)
    private WorkDetail workDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "del_status", nullable = false)
    private RecordStatus delStatus = RecordStatus.ACTIVE;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
