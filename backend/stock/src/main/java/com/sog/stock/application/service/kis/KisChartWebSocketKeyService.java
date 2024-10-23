package com.sog.stock.application.service.kis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sog.stock.application.service.RedisService;
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
public class KisChartWebSocketKeyService {

    private final WebClient webClient;
    private final RedisService redisService;
    private final ObjectMapper objectMapper;

    public KisChartWebSocketKeyService(WebClient.Builder webClientBuilder,
        RedisService redisService, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
        this.redisService = redisService;
        this.objectMapper = objectMapper;
    }

    @Value("${kis.chart.appkey}")
    private String appKey;

    @Value("${kis.chart.appsecret}")
    private String appSecret;

    private final String GRANT_TYPE = "client_credentials";

    // Redis에서 키를 조회하여 반환
    public String getRealTimeWebSocketKey() {
        String key = redisService.getValue("kisChartKey");

        if (key == null) {
            log.info("redis에 웹소켓 키가 없습니다. 발급요청을 시도합니다.");
            requestNewWebSocketKey();
            key = redisService.getValue("kisChartKey");
            log.info("chart - 새로운 웹소켓 키가 발급되었습니다: {}", key);
        } else {
            log.info("이미 chart 키가 존재합니다: {}", key);
        }

        return key;
    }

    // 매일 자정에 새로 WebSocket 키 요청
    @Scheduled(cron = "0 0 0 * * *")
    public void requestWebSocketKeyScheduled() {
        log.info("자정 12시 입니다! - chart");
        requestNewWebSocketKey();
    }

    public void requestNewWebSocketKey() {
        log.info("Requesting new WebSocket key from KIS...");
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("grant_type", "client_credentials");
        requestBody.put("appkey", appKey);
        requestBody.put("secretkey", appSecret);

        try {
            String requestBodyJson = objectMapper.writeValueAsString(requestBody);

            String response = webClient.post()
                .uri("/oauth2/Approval")
                .header(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // 동기적 실행

            String approvalKey = extractApprovalKeyFromResponse(response);
            if (approvalKey != null) {
                redisService.setValues("kisChartKey", approvalKey, Duration.ofHours(24));
                log.info("New Chart WebSocket approval_key successfully saved to Redis: {}",
                    approvalKey);
            } else {
                log.error("Failed to extract approval_key from KIS response(chart): {}", response);
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
