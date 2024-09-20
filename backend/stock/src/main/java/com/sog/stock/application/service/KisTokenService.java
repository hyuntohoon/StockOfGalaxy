package com.sog.stock.application.service;

import com.sog.stock.domain.dto.KisTokenResponseDTO;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class KisTokenService {

    private final WebClient webClient;
    private final RedisService redisService;

    @Value("${kis.appkey}")
    private String appKey;

    @Value("${kis.appsecret}")
    private String appSecret;

    private final String TOKEN_KEY = "kis_token";

    public KisTokenService(WebClient.Builder webClientBuilder, RedisService redisService) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
        this.redisService = redisService;
    }

    // get access token from redis
    public Mono<String> getAccessToken() {
        log.info("getAccessToken method called.");
        String token = redisService.getValue(TOKEN_KEY);
        if (token != null) {
            return Mono.just(token);
        }
        return requestNewToken();
    }

    private Mono<String> requestNewToken() {
        log.info("Preparing token request with appkey: {}", appKey);
        // 요청에 필요한 데이터
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("grant_type", "client_credentials");
        requestBody.put("appkey", appKey);
        requestBody.put("appsecret", appSecret);
        return webClient.post()
            .uri("/oauth2/tokenP")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .bodyValue(requestBody)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                    System.out.println("4xx Error: " + errorBody);
                    return Mono.error(new RuntimeException("4xx Client Error"));
                });
            })
            .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> {
                return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                    System.out.println("5xx Error: " + errorBody);
                    return Mono.error(new RuntimeException("5xx Server Error"));
                });
            })
            .bodyToMono(KisTokenResponseDTO.class)
            .flatMap(response -> {
                if (response.getAccessToken() == null) {
                    return Mono.error(new NullPointerException("AccessToken is null"));
                }
                redisService.setValues(TOKEN_KEY, response.getAccessToken(), Duration.ofHours(6));
                return Mono.just(response.getAccessToken());
            });

    }


}
