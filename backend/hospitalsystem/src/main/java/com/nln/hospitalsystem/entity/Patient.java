package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name="patient")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate; // ngày sinh

    @Column(name="gender", nullable = false)
    private Boolean gender; // true = nam, false = nữ (hoặc enum)

    @Column(name="address")
    private String address;

    @Column(name="email", unique = true)
    private String email;

    @Column(name="phone", unique = true)
    private String phone;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;
}