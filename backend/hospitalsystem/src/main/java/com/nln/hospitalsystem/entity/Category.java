package com.nln.hospitalsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // Optional: nếu muốn xem các bài blog thuộc danh mục này
    @OneToMany(mappedBy = "category")
    private List<Blog> blogs;
}