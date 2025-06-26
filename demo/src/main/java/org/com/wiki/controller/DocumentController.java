package org.com.wiki.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.com.wiki.dto.*;
import org.com.wiki.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://10.10.10.155:3000")
public class DocumentController {

    private final DocumentService documentService;

    /**
     * 새 위키 문서 생성
     * POST /api/documents
     */
    @PostMapping
    public ResponseEntity<DocumentResponse> createDocument(@RequestBody DocumentCreateRequest request, HttpServletRequest httpRequest) {
        // IP 주소 추출 (실제 배포 환경에서는 프록시 설정 등 고려 필요)
        String clientIp = httpRequest.getRemoteAddr();
        request = DocumentCreateRequest.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .editSummary(request.getEditSummary())
                .editorIp(clientIp)
                .build();
        DocumentResponse response = documentService.createDocument(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * 조회수 상위 10개 위키 문서 목록 조회
     * GET /api/documents
     */
    @GetMapping
    public ResponseEntity<List<DocumentListItemResponse>> getAllDocuments() {
        List<DocumentListItemResponse> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    /**
     * 특정 위키 문서 상세 조회 (제목으로)
     * GET /api/documents/{title}
     * <p>
     * 참고: 문서 제목에 특수문자가 포함될 경우 URL 인코딩을 고려해야 합니다.
     * 경로 변수 대신 @RequestParam을 사용하여 title=... 형태로 받는 것도 방법입니다.
     */
    @GetMapping("/{title}")
    public ResponseEntity<DocumentResponse> getDocumentByTitle(@PathVariable String title) {
        DocumentResponse document = documentService.getDocumentByTitle(title);
        return ResponseEntity.ok(document);
    }

    /**
     * 특정 위키 문서 수정 (제목으로)
     * PUT /api/documents/{title}
     */
    @PutMapping("/{title}")
    public ResponseEntity<DocumentResponse> updateDocument(@PathVariable String title, @RequestBody DocumentUpdateRequest request, HttpServletRequest httpRequest) {
        String clientIp = httpRequest.getRemoteAddr();
        request = DocumentUpdateRequest.builder()
                .content(request.getContent())
                .editSummary(request.getEditSummary())
                .editorIp(clientIp)
                .build();
        DocumentResponse response = documentService.updateDocument(title, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 특정 위키 문서 삭제 (제목으로)
     * DELETE /api/documents/{title}
     */
    @DeleteMapping("/{title}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String title) {
        documentService.deleteDocument(title);
        return ResponseEntity.noContent().build();
    }

    /**
     * 특정 문서의 버전 목록 조회
     * GET /api/documents/{title}/versions
     */
    @GetMapping("/{title}/versions")
    public ResponseEntity<List<DocumentVersionListItemResponse>> getDocumentVersions(@PathVariable String title) {
        List<DocumentVersionListItemResponse> versions = documentService.getDocumentVersions(title);
        return ResponseEntity.ok(versions);
    }

    /**
     * 특정 문서의 최신 버전 정보 제공
     * GET /api/documents/{title}/{id}
     */
    @GetMapping("/{title}/{id}")
    public ResponseEntity<List<DocumentVersionListItemResponse>> getDocumentRecentVersions(@PathVariable String title, @PathVariable Long id) {
        List<DocumentVersionListItemResponse> versions = documentService.getDocumentRecentVersions(title, id);
        return ResponseEntity.ok(versions);
    }

    /**
     * 특정 문서의 특정 버전 상세 조회
     * GET /api/documents/{title}/versions/{versionNumber}
     */
    @GetMapping("/{title}/versions/{versionNumber}")
    public ResponseEntity<DocumentVersionResponse> getSpecificDocumentVersion(@PathVariable String title, @PathVariable Integer versionNumber) {
        DocumentVersionResponse version = documentService.getSpecificDocumentVersion(title, versionNumber);
        return ResponseEntity.ok(version);
    }

    /**
     * 특정 문서의 내용을 특정 버전으로 되돌리기
     * POST /api/documents/{title}/rollback/{targetVersionNumber}
     */
    @PostMapping("/{title}/rollback/{targetVersionNumber}")
    public ResponseEntity<DocumentResponse> rollbackDocument(@PathVariable String title, @PathVariable Integer targetVersionNumber,
                                                             @RequestBody(required = false) String editSummary, // 롤백 시 편집 요약
                                                             HttpServletRequest httpRequest) {
        String clientIp = httpRequest.getRemoteAddr();
        DocumentResponse response = documentService.rollbackDocument(title, targetVersionNumber, clientIp, editSummary);
        return ResponseEntity.ok(response);
    }
}
