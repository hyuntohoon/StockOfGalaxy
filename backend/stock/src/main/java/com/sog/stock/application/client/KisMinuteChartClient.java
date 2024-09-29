package com.sog.stock.application.client;

import com.sog.stock.domain.dto.kis.KisMinuteStockResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class KisMinuteChartClient {

    private final WebClient webClient;

    @Value("${kis.realtime-stock.appkey}")
    private String appKey;

    @Value("${kis.realtime-stock.appsecret}")
    private String appSecret;

    public KisMinuteChartClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://openapi.koreainvestment.com:9443")
            .build();
    }

    // 30분 간격으로 차트 데이터를 요청
    public KisMinuteStockResponseDTO requestMinuteChart(String stockCode, String time,
        String token) {
        log.info("시간시간시간!!!! " + time);
        KisMinuteStockResponseDTO response = webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice")
                .queryParam("FID_ETC_CLS_CODE", "")  // 빈 문자열이 필요한지 확인
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")  // 주식 시장 코드
                .queryParam("FID_INPUT_ISCD", stockCode)  // 종목 코드
                .queryParam("FID_INPUT_HOUR_1", time)  // 시간 값 (예: "103000")
                .queryParam("FID_PW_DATA_INCU_YN", "N")  // 과거 데이터 포함 여부 (기본 N)
                .build())
            .header("content-type", "application/json; charset=utf-8")
            .header("authorization", "Bearer " + token)
            .header("appkey", appKey)
            .header("appsecret", appSecret)
            .header("tr_id", "FHKST03010200") // 거래 ID
            .header("custtype", "P")
            .retrieve()
            .onStatus(
                HttpStatusCode::isError,
                clientResponse -> clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                    log.error("API Error: {}", errorBody);
                    return Mono.error(new RuntimeException("API request failed."));
                }))
            .bodyToMono(KisMinuteStockResponseDTO.class)
            .block(); // 동기 처리

        // API 응답을 로그로 출력
        log.info("Response from KIS Minute Chart API: {}", response);

        return response;
    }

}
