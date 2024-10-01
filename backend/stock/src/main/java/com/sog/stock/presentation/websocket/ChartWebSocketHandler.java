package com.sog.stock.presentation.websocket;

import com.sog.stock.application.service.websocket.ChartWebSocketService;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChartWebSocketHandler extends TextWebSocketHandler {

    private final ChartWebSocketService chartWebSocketService;

    // 웹소켓 세션을 담을 맵. 각 세션이 구독한 종목 코드와 함께 관리
    private final Map<WebSocketSession, String> sessionStockCodeMap = new ConcurrentHashMap<>();

    // 웹소켓 세션 담아둘 맵
    Map<String, WebSocketSession> sessionMap = new HashMap<>(); // 웹소켓 세션 담아둘 맵

    // 클라이언트가 소켓 연결시 동작
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Web Socket Connected");
        log.info("session id : {}", session.getId());
        super.afterConnectionEstablished(session);
//        synchronized (sessionMap) {
//            sessionMap.put(session.getId(), session);
//        }
        System.out.println("chart sessionMap :" + sessionMap.toString());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("chart sessionId", session.getId());

        session.sendMessage(new TextMessage(jsonObject.toString()));
    }

    // 클라이언트로부터 메시지 수신시 동작
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String stockCode = message.getPayload(); // 주식종목번호 -> 클라이언트에서 입력한 message
        log.info("--------Message---------");
        log.info("Received stockCode : {}", stockCode);
        log.info("--------Message---------");
//        synchronized (sessionMap) {
//            sessionStockCodeMap.put(session, stockCode);
//        }

        // kis에 주식 구독 요청을 보냅니다.
        chartWebSocketService.subscribeToStock(stockCode, session, false);
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

        // 남아있는 세션이 없을 경우에는 KIS websocket도 해제
        chartWebSocketService.disconnectFromKisWebSocket(session);
        // 세션 맵이나 종목 구독 관리 맵에서 세션 제거
        chartWebSocketService.disconnectFromKisWebSocket(session);

        if (sessionMap.isEmpty()) {
            log.info("모든 클라이언트 세션이 해제되었습니다. chart KIS WebSocket 연결을 해제합니다.");
            chartWebSocketService.disconnectFromKisWebSocket(null);
        }
        super.afterConnectionClosed(session, status); // 실제로 closed
    }
}
