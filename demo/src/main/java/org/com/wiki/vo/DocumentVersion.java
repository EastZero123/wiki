package org.com.wiki.vo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 마크다운 원본 내용

    @Column(nullable = false)
    private Integer versionNumber; // 버전 번호 (예: 1, 2, 3...)

    @Column(nullable = false)
    private String editorIp; // 수정자 IP 또는 사용자 ID (사용자 기능 추가 시)

    @Column(nullable = false)
    private String editSummary; // 편집 요약

    @Column(nullable = false)
    private LocalDateTime editedAt; // 편집 시간

    // 양방향 관계 설정을 위한 Setter (Document에서 호출)
    // 연관 관계: DocumentVersion과 Document는 N:1 관계
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    @PrePersist
    public void prePersist() {
        this.editedAt = LocalDateTime.now();
    }
}