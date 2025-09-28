package com.nln.hospitalsystem.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorWorkDetailKey {
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "work_detail_id")
    private Long workDetailId;
}
