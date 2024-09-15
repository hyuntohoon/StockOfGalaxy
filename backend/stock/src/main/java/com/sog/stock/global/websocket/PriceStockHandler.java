package com.sog.stock.global.websocket;

import com.sog.stock.application.service.KisTokenService;
import com.sog.stock.application.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;


public class PriceStockHandler implements WebSocketHandler {

    private final StockService stockService;
    private final KisTokenService kisTokenService;

    public PriceStockHandler(String appkey, String appsecret) {
        this.appkey = appkey;
        this.appsecret = appsecret;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message)
        throws Exception {

    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception)
        throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus)
        throws Exception {

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
