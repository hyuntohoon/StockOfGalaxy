//package com.sog.stock.global.websocket;
//
//import com.sog.stock.application.service.KisTokenService;
//import com.sog.stock.application.service.StockService;
//import java.util.logging.Logger;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.socket.WebSocketHandler;
//import org.springframework.web.reactive.socket.WebSocketSession;
//import org.springframework.web.reactive.socket.WebSocketMessage;
//
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//import reactor.core.publisher.Mono;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class PriceStockHandler extends TextWebSocketHandler {
//
//    private final StockService stockService;
//    private final KisTokenService kisTokenService;
//    private static final Logger logger = Logger.getLogger(PriceStockHandler.class.getName());
//
//    @Value("${kis.websocket.approval_key}")
//    private String approvalKey;
//
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        // 연결이 성공했을 때 호출되는 메서드
//        logger.info("WebSocket connection established with session: " + session.getId());
//
//        // WebSocket 연결 후에 구독 요청을 전송
//        String subscribeMessage = "{ \"header\": { \"approval_key\": \"your_key\", \"custtype\": \"P\", \"tr_type\": \"1\" }, \"body\": { \"input\": { \"tr_id\": \"H0STCNT0\", \"tr_key\": \"005930\" }}}";
//        session.sendMessage(new TextMessage(subscribeMessage));
//    }
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        // 실시간으로 들어오는 메시지를 처리
//        String payload = message.getPayload();
//        logger.info("Received message: " + payload);
//
//        // 받은 메시지 처리 로직 추가
//        // 예를 들어, 주가 데이터를 처리하는 로직 작성
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, int status) throws Exception {
//        logger.info("WebSocket session closed: " + session.getId());
//    }
//
////    @Override
////    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
////
////    }
////
////    @Override
////    public Mono<Void> handle(WebSocketSession session) {
////        logger.info("WebSocket connection established with session: " + session.getId());
////
////// 데이터 수신 처리 및 전송
////        return kisTokenService.getAccessToken()
////            .flatMap(token -> {
////                // 헤더와 바디를 통합한 메시지 생성
////                String subscribeMessage = "{ " +
////                    "\"header\": { " +
////                    "\"approval_key\": \"" + approvalKey + "\", " +
////                    "\"custtype\": \"P\", " +
////                    "\"tr_type\": \"1\", " +
////                    "\"content-type\": \"utf-8\" }, " +
////                    "\"body\": { " +
////                    "\"input\": { " +
////                    "\"tr_id\": \"H0STCNT0\", " +
////                    "\"tr_key\": \"005930\" } } }"; // 임시로 삼성전자만
////
////                // 로그로 메시지 확인
////                logger.info("Sending WebSocket message: " + subscribeMessage);
////
////                // WebSocket을 통해 메시지 전송
////                return session.send(
////                        Mono.just(session.textMessage(subscribeMessage))) // Send subscription request
////                    .thenMany(session.receive().map(WebSocketMessage::getPayloadAsText))
////                    .doOnNext(message -> {
////                        // 받은 메시지를 처리하고 로그로 기록
////                        logger.info("Received message: " + message);
////                        stockService.processRealTimeStockData(message, token);
////                    }).then();
////            })
////            .doFinally(signalType -> {
////                logger.info("WebSocket session closed: " + session.getId());
////            });
////    }
//}
