package com.sog.user.application.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class StockServiceClient {

    private final WebClient webClient;

    // 임시 port 번호 지정
    public StockServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:9000").build();
    }

    // 필요한 stock 정보 가져오기 -> Mono로



}
