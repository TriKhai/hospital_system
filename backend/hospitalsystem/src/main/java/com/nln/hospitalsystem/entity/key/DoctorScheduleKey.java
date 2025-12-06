package com.nln.hospitalsystem.entity.key;

import com.nln.hospitalsystem.enums.Shifts;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorScheduleKey implements Serializable {
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "shift_type")
    @Enumerated(EnumType.STRING)
    private Shifts shiftType;
}
