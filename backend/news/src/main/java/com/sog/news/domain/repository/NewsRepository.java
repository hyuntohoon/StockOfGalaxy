package com.sog.news.domain.repository;

import com.sog.news.domain.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByPublishedDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
}