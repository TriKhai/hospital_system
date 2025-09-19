package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.ScheduleStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "staff_schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "work_date")
    private LocalDate workDate; // lưu ngày cụ thể

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ScheduleStatus status = ScheduleStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

}
