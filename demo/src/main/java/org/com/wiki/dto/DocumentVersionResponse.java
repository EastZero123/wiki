package org.com.wiki.dto;

import lombok.*;
import org.com.wiki.vo.DocumentVersion;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentVersionResponse {
    private Long id;
    private Long documentId;
    private String content;
    private Integer versionNumber;
    private String editorIp;
    private String editSummary;
    private LocalDateTime editedAt;

    public static DocumentVersionResponse from(DocumentVersion version) {
        return DocumentVersionResponse.builder()
                .id(version.getId())
                .documentId(version.getDocument().getId())
                .content(version.getContent())
                .versionNumber(version.getVersionNumber())
                .editorIp(version.getEditorIp())
                .editSummary(version.getEditSummary())
                .editedAt(version.getEditedAt())
                .build();
    }
}
