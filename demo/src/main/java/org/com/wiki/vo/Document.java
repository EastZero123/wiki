package org.com.wiki.vo;

import jakarta.persistence.*;
import lombok.*;
import lombok.Builder.Default; // ★★★ 이 부분을 반드시 추가하세요 ★★★

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    @Default
    private Long views = 0L;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("versionNumber DESC")
    @Default
    private List<DocumentVersion> versions = new ArrayList<>();

    // 편의 메서드 (양방향 관계 설정)
    public void addVersion(DocumentVersion version) {
        this.versions.add(version);
        version.setDocument(this);
    }

    public void update(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}