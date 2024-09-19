package com.sog.stock.global.config;

import com.sog.stock.application.service.KisTokenService;
import com.sog.stock.application.service.StockService;
import com.sog.stock.global.websocket.PriceStockHandler;
import com.sog.stock.global.websocket.StockWebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.StandardWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
@Slf4j
public class KisWebSocketConfig implements WebSocketConfigurer {

    private final StockWebSocketHandler stockWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // stockWebSocketHandler를 추가
        registry.addHandler(stockWebSocketHandler, "/stock").setAllowedOrigins("*"); // endpoint와 CORS 설정
    }
}
