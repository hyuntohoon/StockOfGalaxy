package com.sog.user.application.client;

import com.sog.user.domain.dto.likeplanet.LikePlanetNumberDTO;
import com.sog.user.domain.dto.stock.StockNameResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class StockServiceClient {

    private final WebClient webClient;

    public StockServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8090/api").build();
    }

    // 종목명을 가져오는 메서드
    public Mono<StockNameResponseDTO> getStockName(String stockCode) {
        return webClient.get()
            .uri("/stock/{stockCode}/name", stockCode)
            .retrieve()
            .bodyToMono(StockNameResponseDTO.class);
    }
}
