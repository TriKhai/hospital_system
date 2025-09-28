package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.RecordStatus;
import com.nln.hospitalsystem.enums.ScheduleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="work_detail")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class WorkDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ScheduleStatus status = ScheduleStatus.AVAILABLE;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "del_status", nullable = false)
    private RecordStatus delStatus = RecordStatus.ACTIVE;

    // Slot thuộc về 1 shift
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_shift_id", nullable = false)
    private WorkShift shift;

    @OneToMany(mappedBy = "workDetail", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<DoctorWorkDetail> doctorWorkDetails = new ArrayList<>();

//    // Một slot có thể gắn với Appointment
//    @OneToOne(mappedBy = "workDetail", cascade = CascadeType.ALL)
//    private Appointment appointment;
}
