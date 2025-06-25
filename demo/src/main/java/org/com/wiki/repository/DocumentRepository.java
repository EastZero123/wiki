package org.com.wiki.repository;

import org.com.wiki.vo.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    Optional<Document> findByTitle(String title); // 제목으로 문서 찾기

    Optional<Document> findById(Long id); // ID로 문서 찾기

    boolean existsByTitle(String title); // 제목 중복 확인

    List<Document> findTop10ByOrderByViewsDesc(); // 문서 목록 조회수 DESC

    @Modifying
    @Transactional
    @Query("UPDATE Document d SET d.views = d.views + 1 WHERE d.id = :id")
    void incrementDocumentViewCount(@Param("id") Long id);
}
