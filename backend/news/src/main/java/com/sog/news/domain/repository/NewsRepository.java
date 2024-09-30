package com.sog.news.domain.repository;

import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    // 필요한 필드들만 선택적으로 조회
    @Query("SELECT new com.sog.news.domain.dto.TodayNewsResponseDTO(n.newsId, n.title, n.publishedDate, n.thumbnailImg) " +
            "FROM News n WHERE n.publishedDate BETWEEN :startOfDay AND :endOfDay")
    List<TodayNewsResponseDTO> findTodayNews(LocalDateTime startOfDay, LocalDateTime endOfDay);

    // 특정 날짜와 주식 이름을 기준으로 조회
    @Query("SELECT n FROM News n JOIN n.keywords k WHERE n.publishedDate BETWEEN :startOfDay AND :endOfDay AND k.newsStockName = :stockName")
    List<News> findByPublishedDateAndStockName(@Param("startOfDay") LocalDateTime startOfDay,
                                               @Param("endOfDay") LocalDateTime endOfDay,
                                               @Param("stockName") String stockName);

    // 뉴스의 제목에서 키워드로 검색하며, 페이징 처리
    Page<News> findByTitleContaining(String titleKeyword, Pageable pageable);
}