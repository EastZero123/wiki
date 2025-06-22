package org.com.wiki.repository;

import org.com.wiki.vo.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findByTitle(String title); // 제목으로 문서 찾기
    boolean existsByTitle(String title); // 제목 중복 확인
}
