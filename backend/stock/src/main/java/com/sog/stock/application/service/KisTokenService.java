package com.sog.stock.application.service;

import com.sog.stock.domain.dto.KisTokenResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class KisTokenService {

    private final WebClient webClient;
    private String accessToken;
    private long tokenExpiryTime;

    @Value("${koreainvestment.appkey}")
    private String appKey;

    @Value("${koreainvestment.appsecret}")
    private String appSecret;

    public KisTokenService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.koreainvestment.com").build();
    }

    // 6시간마다 토큰 갱신
    @Scheduled(fixedDelay = 6 * 60 * 60 * 1000) // 6시간 간격으로 재발급
    public void refreshAccessToken() {
        requestNewToken().subscribe(token -> {
            this.accessToken = token;
            this.tokenExpiryTime = System.currentTimeMillis() + (6 * 60 * 60 * 1000);

        });
    }

    // 외부에서 토큰 요청 시 유효성 체크 후 제공
    public Mono<String> getAccessToken() {
        if (isTokenExpired()) {
            return requestNewToken();
        }
        return Mono.just(accessToken);
    }

    private boolean isTokenExpired() {
        return accessToken == null || System.currentTimeMillis() > tokenExpiryTime;
    }

    private Mono<String> requestNewToken() {
        return webClient.post()
            .uri("/oauth2/token")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .bodyValue("grant_type=client_credentials&appkey=" + appKey + "&appsecret=" + appSecret)
            .retrieve()
            .bodyToMono(KisTokenResponseDTO.class)
            .map(KisTokenResponseDTO::getAccessToken);

    }


}
