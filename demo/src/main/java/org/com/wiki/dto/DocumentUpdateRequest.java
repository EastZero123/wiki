package org.com.wiki.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentUpdateRequest {
    private String content;
    private String editSummary; // 편집 요약
    private String editorIp; // IP 주소 (혹은 사용자 ID)
    private String diff;
}