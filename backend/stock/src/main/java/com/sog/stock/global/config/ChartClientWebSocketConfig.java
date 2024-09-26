package com.sog.stock.global.config;

import com.sog.stock.presentation.websocket.ChartWebSocketHandler;
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
public class ChartClientWebSocketConfig implements WebSocketConfigurer {

    private final ChartWebSocketHandler chartWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // chartwebSocketHandler를 추가
        registry.addHandler(chartWebSocketHandler, "api/ws-chart")
            .setAllowedOrigins("*"); // endpoint와 CORS 설정
    }
}
