package com.sog.stock.global.config;

import com.sog.stock.presentation.websocket.RealtimeStockWebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
@Slf4j
public class RealtimeClientWebSocketConfig implements WebSocketConfigurer {

    private final RealtimeStockWebSocketHandler realtimeStockWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // stockWebSocketHandler를 추가
        registry.addHandler(realtimeStockWebSocketHandler, "/ws-stock")
            .setAllowedOrigins("*"); // endpoint와 CORS 설정
    }
}
