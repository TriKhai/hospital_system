package com.nln.hospitalsystem.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
public class DoctorWorkKey implements Serializable {
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "work_id")
    private Integer workId;

}
