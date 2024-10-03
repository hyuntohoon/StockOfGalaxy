package com.sog.news.domain.repository;

import com.sog.news.domain.model.NewsKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsKeywordRepository extends JpaRepository<NewsKeyword, Long> {
}
