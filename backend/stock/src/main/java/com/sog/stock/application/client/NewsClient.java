package com.sog.stock.application.client;

import com.sog.stock.domain.dto.news.NewsCountByDateResponseDTO;
import com.sog.stock.domain.dto.news.StockNewsCountResponseDTO;
import com.sog.stock.domain.dto.user.UserInfoResponseDTO;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class NewsClient {

    private final WebClient webClient;

    public NewsClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(
            "http://news-service.backcd.svc.cluster.local:80/api").build();
//            "http://localhost:9000/api").build();
    }

    // 일자별 뉴스 기사 수 조회 (리스트로 받음)
    public Mono<List<NewsCountByDateResponseDTO>> getNewsCountByDate(String startDate,
        String endDate) {
        return webClient.get()
            .uri("/news/count-news/{startDate}/{endDate}", startDate, endDate)
            .retrieve()
            .bodyToFlux(NewsCountByDateResponseDTO.class)
            .collectList();
    }

    // 특정일자에 종목별 뉴스 기사 수 top8 조회
    public Mono<List<StockNewsCountResponseDTO>> getNewsCountResponse(String locDate) {
        return webClient.get()
            .uri("/news/top-stocks/{date}", locDate)
            .retrieve()
            .bodyToFlux(StockNewsCountResponseDTO.class)
            .collectList();
    }


}
