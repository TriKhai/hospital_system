package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.RecordStatus;
import com.nln.hospitalsystem.enums.Shifts;
import com.nln.hospitalsystem.enums.WorkStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "work")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "work_date")
    private LocalDate workDate; // lưu ngày cụ thể

//    @Enumerated(EnumType.STRING)
//    @Column(name = "shift_type")
//    private Shifts shiftType;

    @Enumerated(EnumType.STRING)
    @Column(name = "del_status", nullable = false)
    private RecordStatus delStatus = RecordStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_status")
    private WorkStatus workStatus = WorkStatus.WORKING;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Quan hệ 1 ngày làm việc có nhiều ca
    @OneToMany(mappedBy = "work", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<WorkShift> workShifts = new ArrayList<>();

//    @OneToMany(mappedBy = "work", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
//    private List<DoctorWork> doctorWorks = new ArrayList<>();
}
