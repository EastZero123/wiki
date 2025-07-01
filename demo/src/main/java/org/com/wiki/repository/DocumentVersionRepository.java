package org.com.wiki.repository;

import org.com.wiki.vo.DocumentVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentVersionRepository extends JpaRepository<DocumentVersion, Long> {
    List<DocumentVersion> findByDocumentIdOrderByVersionNumberDesc(Long documentId); // 특정 문서의 버전 목록 조회
    Optional<DocumentVersion> findByDocumentIdAndVersionNumber(Long documentId, Integer versionNumber); // 특정 문서의 특정 버전 조회
    DocumentVersion findFirstByDocumentIdAndUseYnOrderByVersionNumberDesc(Long documentId, String useYn);

}
