package org.com.wiki.dto;

import lombok.*;
import org.com.wiki.vo.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentListItemResponse {
    private Long id;
    private String title;
    private LocalDateTime updatedAt;

    public static DocumentListItemResponse from(Document document) {
        return DocumentListItemResponse.builder()
                .id(document.getId())
                .title(document.getTitle())
                .updatedAt(document.getUpdatedAt())
                .build();
    }
}
