package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drug_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "unit")
    private String unit;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Drug> drugs = new ArrayList<>();
}
