package com.sog.news.domain.repository;

import com.sog.news.domain.dto.NewsPreviewContainContentResponseDTO;
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

    // 필요한 필드들만 선택적으로 조회
    @Query("SELECT new com.sog.news.domain.dto.NewsPreviewContainContentResponseDTO(n.newsId, n.title, n.publishedDate, n.thumbnailImg, SUBSTRING(n.content, 1, 50)) " +
            "FROM News n WHERE n.publishedDate BETWEEN :startOfDay AND :endOfDay")
    List<NewsPreviewContainContentResponseDTO> findTodayNewsWithContent(LocalDateTime startOfDay, LocalDateTime endOfDay);

    // 특정 날짜와 주식 이름을 기준으로 조회
    @Query("SELECT n FROM News n JOIN n.keywords k WHERE n.publishedDate BETWEEN :startOfDay AND :endOfDay AND k.newsStockName = :stockName")
    List<News> findByPublishedDateAndStockName(@Param("startOfDay") LocalDateTime startOfDay,
                                               @Param("endOfDay") LocalDateTime endOfDay,
                                               @Param("stockName") String stockName);



    // 뉴스의 제목에서 키워드로 검색하며, 최신순으로 페이징 처리
    @Query(value = "SELECT * FROM news WHERE news_id IN (SELECT nk.news_keyword_id FROM news_keyword nk WHERE nk.news_stock_name = ?1) AND DATE(published_date) = ?2 ORDER BY published_date DESC LIMIT ?#{#pageable.pageSize} OFFSET ?#{#pageable.offset}",
        countQuery = "SELECT count(*) FROM news WHERE news_id IN (SELECT nk.news_keyword_id FROM news_keyword nk WHERE nk.news_stock_name = ?1) AND DATE(published_date) = ?2",
        nativeQuery = true)
    Page<News> findByTitleContaining(String stockName, String publishedDate, Pageable pageable);

    // 뉴스의 내용에서 키워드로 검색하며, 최신순으로 페이징 처리
    @Query(value = "SELECT * FROM news WHERE MATCH(content) AGAINST(?1 IN BOOLEAN MODE) ORDER BY published_date DESC LIMIT ?#{#pageable.pageSize} OFFSET ?#{#pageable.offset}",
            countQuery = "SELECT count(*) FROM news WHERE MATCH(content) AGAINST(?1 IN BOOLEAN MODE)",
            nativeQuery = true)
    Page<News> findByContentContaining(String contentKeyword, Pageable pageable);

    // 제목 또는 본문에서 키워드를 검색하며, 최신순으로 페이징 처리
    @Query(value = "SELECT * FROM news WHERE MATCH(title) AGAINST(?1 IN BOOLEAN MODE) OR MATCH(content) AGAINST(?2 IN BOOLEAN MODE) " +
            "ORDER BY published_date DESC LIMIT ?#{#pageable.pageSize} OFFSET ?#{#pageable.offset}",
            countQuery = "SELECT count(*) FROM news WHERE MATCH(title) AGAINST(?1 IN BOOLEAN MODE) OR MATCH(content) AGAINST(?2 IN BOOLEAN MODE)",
            nativeQuery = true)
    Page<News> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);

    // 일자별로 기사 수를 조회, 0번째 인덱스는 날짜, 1번째 인덱스는 기사 수를 담고있음
    @Query("SELECT DATE(n.publishedDate) as date, COUNT(n) as count " +
            "FROM News n " +
            "WHERE n.publishedDate BETWEEN :startDate AND :endDate " +
            "GROUP BY DATE(n.publishedDate) " +
            "ORDER BY DATE(n.publishedDate)")
    List<Object[]> findNewsCountByDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // 종목별로 기사 수를 집계하고 상위 8개를 조회
    //@Cacheable("topNewsStockCount") // 캐싱 처리
    @Query("SELECT k.newsStockName, COUNT(n) as count " +
            "FROM News n JOIN n.keywords k " +
            "WHERE DATE(n.publishedDate) = :date " +
            "GROUP BY k.newsStockName " +
            "ORDER BY count DESC")
    List<Object[]> findTopNewsStockCountByDate(@Param("date") LocalDate date, Pageable pageable);

}