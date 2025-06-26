package org.com.wiki.dto;

import lombok.*;
import org.com.wiki.vo.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentResponse {
    private Long id;
    private String title;
    private String content; // 현재 최신 버전의 내용
    private String editSummary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DocumentResponse from(Document document) {
        String content = document.getVersions().isEmpty() ? "" : document.getVersions().get(0).getContent();
        String editSummary = document.getVersions().isEmpty() ? "" : document.getVersions().get(0).getEditSummary();
        return DocumentResponse.builder()
                .id(document.getId())
                .title(document.getTitle())
                .content(content)
                .editSummary(editSummary)
                .createdAt(document.getCreatedAt())
                .updatedAt(document.getUpdatedAt())
                .build();
    }
}