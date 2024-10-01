package com.sog.stock.application.client;

import com.sog.stock.domain.dto.kis.KisPresentPriceResponseDTO;
import java.net.http.HttpHeaders;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class KisPresentPriceClient {

    private final WebClient webClient;

    @Value("${kis.realtime-stock.appkey}")
    private String appKey;

    @Value("${kis.realtime-stock.appsecret}")
    private String appSecret;

    public KisPresentPriceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443")
            .build();
    }

    // 현재가 조회
    public KisPresentPriceResponseDTO requestStockPresentPrice(String stockCode, String token) {
        log.info("Requesting stock present price for stock code: {}", stockCode); // 요청 로그

        KisPresentPriceResponseDTO response = webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/uapi/domestic-stock/v1/quotations/inquire-price")
                .queryParam("FID_COND_MRKT_DIV_CODE", "J") // 주식으로 고정
                .queryParam("FID_INPUT_ISCD", stockCode) // 종목코드
                .build())
            .header("content-type", "application/json; charset=utf-8")
            .header("authorization", "Bearer " + token)
            .header("appkey", appKey)
            .header("appsecret", appSecret)
            .header("tr_id", "FHKST01010100")
            .header("tr_cont", "")
            .header("custtype", "P")
            .retrieve()
            .onStatus(HttpStatusCode::isError, clientResponse -> {
                return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                    log.error("API Error: {}", errorBody); // 오류 로그
                    return Mono.error(new RuntimeException("API request failed."));
                });
            })
            .bodyToMono(KisPresentPriceResponseDTO.class)
            .block(); // 동기 처리

        log.info("Response from KIS: {}", response); // 응답 로그
        return response;
    }

}
