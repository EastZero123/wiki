package org.com.wiki.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DocumentCreateRequest {
    private String title;
    private String content;
    private String editSummary; // 편집 요약 (선택 사항)
    private String editorIp; // IP 주소 (혹은 사용자 ID)
}