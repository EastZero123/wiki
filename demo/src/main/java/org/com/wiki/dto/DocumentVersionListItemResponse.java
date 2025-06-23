package org.com.wiki.dto;

import lombok.*;
import org.com.wiki.vo.DocumentVersion;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentVersionListItemResponse {
    private Long id;
    private String content;
    private Integer versionNumber;
    private String editorIp;
    private String editSummary;
    private LocalDateTime editedAt;

    public static DocumentVersionListItemResponse from(DocumentVersion version) {
        return DocumentVersionListItemResponse.builder()
                .id(version.getId())
                .content(version.getContent())
                .versionNumber(version.getVersionNumber())
                .editorIp(version.getEditorIp())
                .editSummary(version.getEditSummary())
                .editedAt(version.getEditedAt())
                .build();
    }
}
