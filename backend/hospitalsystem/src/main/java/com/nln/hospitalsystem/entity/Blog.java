package com.nln.hospitalsystem.entity;

import com.nln.hospitalsystem.enums.BlogStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Id;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "blogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

//    private String slug;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private BlogStatus status;

    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor author;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private int likes;

    @Column(name = "related_link")
    private String relatedLink;

    private LocalDateTime publishedAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "blog_tags",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )

    private List<Tag> tags;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}