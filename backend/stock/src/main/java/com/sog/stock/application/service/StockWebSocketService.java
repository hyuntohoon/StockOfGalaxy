package com.sog.stock.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sog.stock.domain.dto.StockPriceResponseDTO;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
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
    // kis와 spring간 -> 궁극적인 목적은 웹소켓 실시간 통신 (실시간 시세)
    private final WebSocketClient webSocketClient;
    private WebSocketSession kisWebSocketSession;
    private final RedisService redisService;
    private String kisWebSocketApprovalKey;

    // KIS WebSocket 세션을 유지

    // 도메인 정보와 엔드포인트 정보 추가
    private final String kisWebSocketDomain = "ws://ops.koreainvestment.com:21000";
    private final String kisWebSocketEndPoint = "/tryitout/H0STCNT0";

    // 종목 코드별로 구독한 클라이언트 세션을 관리
    private final Map<String, List<WebSocketSession>> stockCodeSubscribers = new ConcurrentHashMap<>();

    // redis에서 가져오기 -> 수정

    @Autowired
    public StockWebSocketService(WebSocketClient webSocketClient, RedisService redisService) {
        this.webSocketClient = webSocketClient;
        this.redisService = redisService;
        this.kisWebSocketApprovalKey = redisService.getValue("kisRealTimeKey");
    }

    // KIS WebSocket 연결을 유지하기 위한 메서드 (최초 연결)
    public void connectToKisWebSocket() throws InterruptedException, ExecutionException {
        if (kisWebSocketSession == null || !kisWebSocketSession.isOpen()) {
            String fullWebSocketUrl = kisWebSocketDomain + kisWebSocketEndPoint;

            // KIS WebSocket으로 연결
            webSocketClient.doHandshake(new AbstractWebSocketHandler() {
                @Override
                public void afterConnectionEstablished(WebSocketSession session) throws Exception {
                    kisWebSocketSession = session;
                    log.info("Connected to KIS WebSocket");
                }

                @Override
                protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
                    String payload = message.getPayload();
                    log.info("Received message from KIS WebSocket: {}", payload);

                    // JSON 형식의 연결 확인 메시지 처리
                    if (isJsonMessage(payload)) {
                        JSONObject jsonResponse = new JSONObject(payload);
                        if (jsonResponse.getJSONObject("body").getString("msg1").equals("SUBSCRIBE SUCCESS")) {
                            log.info("Subscription confirmed for stock: {}",
                                jsonResponse.getJSONObject("header").getString("tr_key"));
                            return;
                        }
                    }

                    // 실시간 데이터 처리 (첫 번째 응답이 아닌 경우)
                    StockPriceResponseDTO stockPriceResponseDTO = parseStockResponse(payload);
                    if (stockPriceResponseDTO != null) {
                        log.info("Received stock data for {}: {}", stockPriceResponseDTO.getStock_code(), stockPriceResponseDTO);

                        // 해당 종목을 구독한 모든 클라이언트 세션에 실시간 데이터를 전송
                        String stockCode = stockPriceResponseDTO.getStock_code();
                        List<WebSocketSession> subscribers = stockCodeSubscribers.get(stockCode);
                        if (subscribers != null) {
                            for (WebSocketSession clientSession : subscribers) {
                                clientSession.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(stockPriceResponseDTO)));
                            }
                        }
                    }
                }

            }, fullWebSocketUrl).get();
        }
    }

    // 클라이언트가 새로운 종목을 구독할 때 호출되는 메서드
    public void subscribeToStock(String stockCode, WebSocketSession clientSession)
        throws InterruptedException, ExecutionException, IOException {
        if (kisWebSocketSession == null || !kisWebSocketSession.isOpen()) {
            connectToKisWebSocket();
        }

        // 종목별로 구독하는 클라이언트를 관리
        stockCodeSubscribers.computeIfAbsent(stockCode, k -> new ArrayList<>()).add(clientSession);

        // KIS WebSocket으로 구독 요청 전송
        String requestMessage = createSubscribeMessage(stockCode);
        kisWebSocketSession.sendMessage(new TextMessage(requestMessage));
        log.info("Sent subscription request for stock: {}", stockCode);
    }

    // JSON 메시지 판별 (연결 확인 메시지 구분)
    private boolean isJsonMessage(String message) {
        try {
            new JSONObject(message);
            return true;
        } catch (JSONException e) {
            return false;
        }
    }

    // KIS 응답을 StockPriceResponseDTO로 변환하는 로직
    private StockPriceResponseDTO parseStockResponse(String response) {
        // 데이터를 | 기준으로 분리
        String[] pipeSplitData = response.split("\\|");

        // 마지막 요소를 ^로 분리
        String[] caretSplitData = pipeSplitData[pipeSplitData.length - 1].split("\\^");

        // DTO로 매핑
        StockPriceResponseDTO stockPriceResponseDTO = new StockPriceResponseDTO();
        stockPriceResponseDTO.setStock_code(caretSplitData[0]);
        stockPriceResponseDTO.setStock_prpr(caretSplitData[2]);
        stockPriceResponseDTO.setPrdy_vrss_sign(caretSplitData[3]);
        stockPriceResponseDTO.setPrdy_vrss(caretSplitData[4]);
        stockPriceResponseDTO.setPrdy_ctrt(caretSplitData[5]);

        return stockPriceResponseDTO;
    }

    // KIS WebSocket으로 주식 구독 메시지를 전송하기 위한 JSON 메시지 생성
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
}
