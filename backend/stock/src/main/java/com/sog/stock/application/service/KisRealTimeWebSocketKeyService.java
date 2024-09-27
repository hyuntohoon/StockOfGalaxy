package com.sog.stock.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
@EnableScheduling
public class KisRealTimeWebSocketKeyService {

    private final WebClient webClient;
    private final RedisService redisService;
    private final ObjectMapper objectMapper;

    public KisRealTimeWebSocketKeyService(WebClient.Builder webClientBuilder,
        RedisService redisService, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
        this.redisService = redisService;
        this.objectMapper = objectMapper;
    }

    @Value("${kis.realtime-stock.appkey}")
    private String appKey;

    @Value("${kis.realtime-stock.appsecret}")
    private String appSecret;

    private final String GRANT_TYPE = "client_credentials";

    // Redis에서 키를 조회하여 반환, 없으면 새로운 키 요청
    public String getRealTimeWebSocketKey() {
        String key = redisService.getValue("kisRealTimeKey");

        if (key == null) {
            log.info("WebSocket key not found in Redis, requesting a new one...");
            requestNewWebSocketKey();
            key = redisService.getValue("kisRealTimeKey");  // 동기적 요청 후 다시 Redis에서 가져옴
            log.info("New WebSocket key retrieved from Redis after request: {}", key);
        } else {
            log.info("Redis에서 실시간 키가 존재합니다: {}", key);
        }

        return key;
    }


    // 매일 자정에 새로 WebSocket 키 요청
    @Scheduled(cron = "0 0 0 * * *")
    public void requestWebSocketKeyScheduled() {
        log.info("자정 12시 입니다!");
        requestNewWebSocketKey();
    }

    // websocket key 재요청
    public void requestNewWebSocketKey() {
        log.info("Requesting new WebSocket key from KIS...");
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("grant_type", "client_credentials");
        requestBody.put("appkey", appKey);
        requestBody.put("secretkey", appSecret);

        try {
            String requestBodyJson = objectMapper.writeValueAsString(requestBody);

            // 동기적으로 WebSocket key 요청
            String response = webClient.post()
                .uri("/oauth2/Approval")
                .header(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class)
                .block();  // 동기적으로 실행

            String approvalKey = extractApprovalKeyFromResponse(response);
            if (approvalKey != null) {
                redisService.setValues("kisRealTimeKey", approvalKey, Duration.ofHours(6));
                log.info("New WebSocket approval_key successfully saved to Redis: {}", approvalKey);
            } else {
                log.error("Failed to extract approval_key from KIS response: {}", response);
            }
        } catch (JsonProcessingException e) {
            log.error("Error converting request body to JSON: {}", e.getMessage());
        }
    }

    // 응답에서 approval_key 추출
    private String extractApprovalKeyFromResponse(String response) {
        try {
            // JSON 응답 파싱
            JSONObject jsonResponse = new JSONObject(response);
            return jsonResponse.getString("approval_key");  // 응답에서 approval_key 추출
        } catch (JSONException e) {
            log.error("Error parsing approval_key from response: {}", e.getMessage());
            return null;
        }
    }


}
