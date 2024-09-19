package com.sog.stock.global.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sog.stock.application.service.StockWebSocketService;
import com.sog.stock.domain.dto.StockPriceResponseDTO;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
@EnableScheduling
@RequiredArgsConstructor
public class StockWebSocketHandler extends TextWebSocketHandler {

    private final StockWebSocketService stockWebSocketService;
    private final Map<WebSocketSession, String> sessionStockCodeMap = new ConcurrentHashMap<>();

    // 웹소켓 세션 담아둘 맵
    Map<String, WebSocketSession> sessionMap = new HashMap<>(); // 웹소켓 세션 담아둘 맵

    // 클라이언트로부터 메시지 수신시 동작
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String stockCode = message.getPayload(); // 주식종목번호 -> 클라이언트에서 입력한 message
        log.info("--------Message---------");
        log.info("Received stockCode : {}", stockCode);
        log.info("--------Message---------");
        synchronized (sessionMap) {
            sessionStockCodeMap.put(session, stockCode);
        }
    }

    // 클라이언트가 소켓 연결시 동작
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Web Socket Connected");
        log.info("session id : {}", session.getId());
        super.afterConnectionEstablished(session);
        synchronized (sessionMap) {
            sessionMap.put(session.getId(), session);
        }
        System.out.println("sessionMap :" + sessionMap.toString());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("sessionId", session.getId());

        session.sendMessage(new TextMessage(jsonObject.toString()));


    }

    // 클라이언트가 소켓 종료시 동작
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws Exception {
        log.info("Web Socket DisConnected");
        log.info("session id : {}", session.getId());
        synchronized (sessionMap) {
            sessionMap.remove(session.getId()); // 여러 클라이언트의 동시 접근하여 Map의 SessionID가 변경되는 것을 막기 위함
        }
        super.afterConnectionClosed(session, status); // 실제로 closed
    }

    // 3초에 한 번씩 주식데이터를 들고옵니다. (임시)
    @Scheduled(fixedRate = 3000)
    public void sendStockCode() throws JSONException, IOException {
        log.info("Scheduled check--------");
        synchronized (sessionMap) {
            for (WebSocketSession session : sessionMap.values()) {
                String stockCode = sessionStockCodeMap.get(session);
                if (stockCode != null) {
                    try {
                        // 주식데이터를 가져오는 로직 -> service단에 설계합니다.
                        StockPriceResponseDTO stockPriceResponseDTO = stockWebSocketService.getStock(
                            stockCode);
                        if (stockPriceResponseDTO != null) {
                            String response = new ObjectMapper().writeValueAsString(
                                stockPriceResponseDTO);
                            log.info("Sending stock data : {}", response);
                            try {
                                session.sendMessage(new TextMessage(response));
                                //Message로 보내기
                            } catch (IllegalStateException e) {
                                log.warn("Failed to send message, ignoring: {}", e.getMessage());
                            }
                        } else {
                            log.info("dto가 null입니다.");
                        }
                    } catch (Exception e) {
                        log.error("stock data를 들고오는 동안 에러가 발생했습니다 : {}", e.getMessage());
                    }
                }
            }
        }
    }
}
