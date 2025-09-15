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
public class PrescriptionDetailKey implements Serializable {
    @Column(name = "prescription_id")
    private Integer prescriptionId;

    @Column(name = "drug_id")
    private Integer drugID;
}
