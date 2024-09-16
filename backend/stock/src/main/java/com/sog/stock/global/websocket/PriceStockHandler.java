package com.sog.stock.global.websocket;

import com.sog.stock.application.service.KisTokenService;
import com.sog.stock.application.service.StockService;
import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class PriceStockHandler implements WebSocketHandler {

    private final StockService stockService;
    private final KisTokenService kisTokenService;
    private static final Logger logger = Logger.getLogger(PriceStockHandler.class.getName());

    @Value("${kis.websocket.approval_key}")
    private String approvalKey;

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        logger.info("WebSocket connection established with session: " + session.getId());

// 데이터 수신 처리 및 전송
        return kisTokenService.getAccessToken()
            .flatMap(token -> {
                // 헤더와 바디를 통합한 메시지 생성
                String subscribeMessage = "{ " +
                    "\"header\": { " +
                    "\"approval_key\": \"" + approvalKey + "\", " +
                    "\"custtype\": \"P\", " +
                    "\"tr_type\": \"1\", " +
                    "\"content-type\": \"utf-8\" }, " +
                    "\"body\": { " +
                    "\"input\": { " +
                    "\"tr_id\": \"H0STCNT0\", " +
                    "\"tr_key\": \"005930\" } } }"; // 임시로 삼성전자만

                // 로그로 메시지 확인
                logger.info("Sending WebSocket message: " + subscribeMessage);

                // WebSocket을 통해 메시지 전송
                return session.send(
                        Mono.just(session.textMessage(subscribeMessage))) // Send subscription request
                    .thenMany(session.receive().map(WebSocketMessage::getPayloadAsText))
                    .doOnNext(message -> {
                        // 받은 메시지를 처리하고 로그로 기록
                        logger.info("Received message: " + message);
                        stockService.processRealTimeStockData(message, token);
                    }).then();
            })
            .doFinally(signalType -> {
                logger.info("WebSocket session closed: " + session.getId());
            });
    }
}
