package org.com.wiki.service;

import lombok.RequiredArgsConstructor;
import org.com.wiki.dto.*;
import org.com.wiki.exception.DuplicateTitleException;
import org.com.wiki.exception.ResourceNotFoundException;
import org.com.wiki.repository.DocumentRepository;
import org.com.wiki.repository.DocumentVersionRepository;
import org.com.wiki.vo.Document;
import org.com.wiki.vo.DocumentVersion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentVersionRepository documentVersionRepository;

    /**
     * 새 문서를 생성합니다.
     */
    @Transactional
    public DocumentResponse createDocument(DocumentCreateRequest request) {
        if (documentRepository.existsByTitle(request.getTitle())) {
            throw new DuplicateTitleException("이미 존재하는 문서 제목입니다: " + request.getTitle());
        }

        Document document = Document.builder()
                .title(request.getTitle())
                .build();

        // 첫 번째 버전 추가
        DocumentVersion initialVersion = DocumentVersion.builder()
                .content(request.getContent())
                .versionNumber(1)
                .editorIp(request.getEditorIp())
                .editSummary(request.getEditSummary() != null ? request.getEditSummary() : "문서 생성")
                .build();

        document.addVersion(initialVersion);
        documentRepository.save(document);

        return DocumentResponse.from(document);
    }

    /**
     * 상위 10개 조회수 문서 목록을 조회합니다.
     */
    public List<DocumentListItemResponse> getAllDocuments() {
        return documentRepository.findTop10ByOrderByViewsDesc().stream()
                .map(DocumentListItemResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 특정 문서의 상세 정보를 조회합니다. (최신 버전의 내용 포함)
     */
    public DocumentResponse getDocumentByTitle(String title) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + title));

        return DocumentResponse.from(document);
    }

    /**
     * 조회수 1을 증가 시킵니다.
     */
    @Transactional
    public void incrementDocumentViewCount(Long id) {
        documentRepository.incrementDocumentViewCount(id);
    }

    /**
     * 특정 문서의 ID로 상세 정보를 조회합니다. (최신 버전의 내용 포함)
     */
    public DocumentResponse getDocumentById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + id));
        return DocumentResponse.from(document);
    }

    /**
     * 특정 문서를 수정합니다. (새로운 버전 추가)
     */
    @Transactional
    public DocumentResponse updateDocument(String title, DocumentUpdateRequest request) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + title));

        document.update(title); // 문서의 updatedAt 갱신

        // 새 버전 생성
        int nextVersionNumber = document.getVersions().isEmpty() ? 1 : document.getVersions().get(0).getVersionNumber() + 1;
        DocumentVersion newVersion = DocumentVersion.builder()
                .content(request.getContent())
                .versionNumber(nextVersionNumber)
                .editorIp(request.getEditorIp())
                .editSummary(request.getEditSummary() != null ? request.getEditSummary() : "문서 수정")
                .build();

        document.addVersion(newVersion);
        documentRepository.save(document); // CascadeType.ALL 덕분에 documentVersion도 함께 저장/업데이트

        return DocumentResponse.from(document);
    }

    /**
     * 특정 문서를 삭제합니다. (모든 버전 포함)
     */
    @Transactional
    public void deleteDocument(String title) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("삭제할 문서를 찾을 수 없습니다: " + title));
        documentRepository.delete(document);
    }

    /**
     * 특정 문서의 모든 버전 목록을 조회합니다.
     */
    public List<DocumentVersionListItemResponse> getDocumentVersions(String title) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + title));

        return documentVersionRepository.findByDocumentIdOrderByVersionNumberDesc(document.getId()).stream()
                .map(DocumentVersionListItemResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 특정 문서의 최신 버전을 조회합니다.
     */
    @Transactional
    public List<DocumentVersionListItemResponse> getDocumentRecentVersions(String title, Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + id));

         DocumentVersion latestVersion = documentVersionRepository.findFirstByDocumentIdAndUseYnOrderByVersionNumberDesc(document.getId(), "Y");

        documentRepository.incrementDocumentViewCount(latestVersion.getDocument().getId());

        DocumentVersionListItemResponse response = DocumentVersionListItemResponse.builder()
                .id(latestVersion.getId())
                .content(latestVersion.getContent())
                .editSummary(latestVersion.getEditSummary())
                .editedAt(latestVersion.getEditedAt())
                .editorIp(latestVersion.getEditorIp())
                .versionNumber(latestVersion.getVersionNumber())
                .build();
        return Collections.singletonList(response);
    }

    /**
     * 특정 문서의 특정 버전을 조회합니다.
     */
    public DocumentVersionResponse getSpecificDocumentVersion(String title, Integer versionNumber) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + title));

        DocumentVersion version = documentVersionRepository.findByDocumentIdAndVersionNumber(document.getId(), versionNumber)
                .orElseThrow(() -> new ResourceNotFoundException("해당 버전의 문서를 찾을 수 없습니다: 문서=" + title + ", 버전=" + versionNumber));

        return DocumentVersionResponse.from(version);
    }

    /**
     * 특정 문서의 내용을 특정 버전으로 되돌립니다. (새로운 버전으로 저장)
     */
    @Transactional
    public DocumentResponse rollbackDocument(String title, Integer targetVersionNumber, String editorIp, String editSummary) {
        Document document = documentRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("문서를 찾을 수 없습니다: " + title));

        DocumentVersion targetVersion = documentVersionRepository.findByDocumentIdAndVersionNumber(document.getId(), targetVersionNumber)
                .orElseThrow(() -> new ResourceNotFoundException("롤백할 버전을 찾을 수 없습니다: 문서=" + title + ", 버전=" + targetVersionNumber));

        // 새로운 버전으로 롤백 내용을 저장
        int nextVersionNumber = document.getVersions().isEmpty() ? 1 : document.getVersions().get(0).getVersionNumber() + 1;
        DocumentVersion newVersion = DocumentVersion.builder()
                .content(targetVersion.getContent()) // 롤백할 버전의 내용
                .versionNumber(nextVersionNumber)
                .editorIp(editorIp)
                .editSummary(editSummary != null ? editSummary : "버전 " + targetVersionNumber + "으로 롤백")
                .build();

        document.addVersion(newVersion);
        documentRepository.save(document);

        return DocumentResponse.from(document);
    }
}