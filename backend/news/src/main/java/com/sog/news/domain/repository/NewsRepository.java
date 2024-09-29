package com.sog.news.domain.repository;

import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    // 필요한 필드들만 선택적으로 조회
    @Query("SELECT new com.sog.news.domain.dto.TodayNewsResponseDTO(n.newsId, n.title, n.publishedDate, n.thumbnailImg) " +
            "FROM News n WHERE n.publishedDate BETWEEN :startOfDay AND :endOfDay")
    List<TodayNewsResponseDTO> findTodayNews(LocalDateTime startOfDay, LocalDateTime endOfDay);
}