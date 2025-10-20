package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.SlotStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private SlotStatus status = SlotStatus.AVAILABLE;
    // AVAILABLE, BOOKED, CANCELLED

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "doctor_id", referencedColumnName = "doctor_id"),
            @JoinColumn(name = "schedule_id", referencedColumnName = "schedule_id")
    })
    private DoctorSchedule doctorSchedule;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "slot", cascade = CascadeType.ALL, orphanRemoval = true)
    private Appointment appointment;
}
