package com.sog.stock.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sog.stock.domain.dto.StockPriceResponseDTO;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;


@Service
@Slf4j
public class StockWebSocketService {

    private final KisTokenService kisTokenService;
    private final WebSocketClient webSocketClient;

    // 도메인 정보와 엔드포인트 정보 추가
    private final String kisWebSocketDomain = "ws://ops.koreainvestment.com:21000";
    private final String kisWebSocketEndPoint = "/tryitout/H0STCNT0";

    // 첫 번째 응답을 무시하기 위한 상태 변수
    private final AtomicBoolean isFirstResponseReceived = new AtomicBoolean(false);

    @Autowired
    public StockWebSocketService(KisTokenService kisTokenService,
        WebSocketClient webSocketClient) {
        this.kisTokenService = kisTokenService;
        this.webSocketClient = webSocketClient;
    }

    @Value("${kis.websocket.approval_key}")
    private String kisWebSocketApprovalKey;

    // kis측으로 요청보낼 json 메시지를 생성 (주식 조회 요청)
    private String createSubscribeMessage(String stockCode) {
        Map<String, String> header = new HashMap<>();
        header.put("approval_key", kisWebSocketApprovalKey);
        header.put("custtype", "P");
        header.put("tr_type", "1");
        header.put("content-type", "utf-8");

        Map<String, Map<String, String>> body = new HashMap<>();
        Map<String, String> input = new HashMap<>();
        input.put("tr_id", "H0STCNT0");
        input.put("tr_key", stockCode);
        body.put("input", input);

        Map<String, Object> request = new HashMap<>();
        request.put("header", header);
        request.put("body", body);

        // json 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON 변환 에러", e);

        }
    }

    // kis로 주식 데이터 요청
    public StockPriceResponseDTO getStock(String stockCode)
        throws InterruptedException, ExecutionException {

        // websocket 요청 메시지 생성
        String requestMessage = createSubscribeMessage(stockCode);

        // websocket 연결을 위한 latch
        CountDownLatch latch = new CountDownLatch(1);
        StockPriceResponseDTO[] stockPriceResponseDTO = new StockPriceResponseDTO[1];

        // KIS WebSocket 연결 (domain + endpoint)
        String fullWebSocketUrl = kisWebSocketDomain + kisWebSocketEndPoint;

        // KIS WebSocket으로 전송 및 응답 처리
        webSocketClient.doHandshake(new AbstractWebSocketHandler() {
            @Override
            public void afterConnectionEstablished(WebSocketSession session) throws Exception {
                // 메시지 전송
                session.sendMessage(new TextMessage(requestMessage));
            }

            @Override
            protected void handleTextMessage(WebSocketSession session, TextMessage message)
                throws Exception {
                // 메시지 수신 처리
                String payload = message.getPayload();

                // 첫번째 응답인지 확인
                if (!isFirstResponseReceived.get()) {
                    // 첫번째 응답을 수신했다면 무시한다.
                    log.info("First response received: Subscription confirmation.");
                    isFirstResponseReceived.set(true);
                    return;  // 첫 번째 응답은 처리하지 않음
                }

                // 첫번째 응답이 아니라면 처리 -> 응답을 DTO로 변환
                stockPriceResponseDTO[0] = parseStockResponse(payload);
                System.out.println(stockCode + "종목정보입니다....... " + stockPriceResponseDTO[0]);
                latch.countDown(); // latch 감소하여 응답 받았음을 알림
            }
        }, fullWebSocketUrl).get();

        // 응답이 올 때까지 대기
        latch.await();

        return stockPriceResponseDTO[0];
    }

    // KIS 응답을 StockPriceResponseDTO로 변환하는 로직
    private StockPriceResponseDTO parseStockResponse(String response) {
        // 데이터를 | 기준으로 분리
        String[] pipeSplitData = response.split("\\|");

        // 마지막 요소를 ^로 분리
        String[] caretSplitData = pipeSplitData[pipeSplitData.length - 1].split("\\^");

        // 필요한 정보를 추출
        String currentPrice = caretSplitData[2]; // 현재가
        String tradeVolume = caretSplitData[3]; // 전일대비 부호
        String priceChange = caretSplitData[4]; // 전일대비
        String priceChangeRate = caretSplitData[5]; // 전일대비율

        // DTO로 매핑
        StockPriceResponseDTO stockPriceResponseDTO = new StockPriceResponseDTO();
        stockPriceResponseDTO.setStock_prpr(currentPrice);
        stockPriceResponseDTO.setPrdy_vrss_sign(tradeVolume);
        stockPriceResponseDTO.setPrdy_vrss(priceChange);
        stockPriceResponseDTO.setPrdy_ctrt(priceChangeRate);

        return stockPriceResponseDTO;
    }
}
