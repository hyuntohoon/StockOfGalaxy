package com.sog.stock.global.config;

import com.sog.stock.global.websocket.PriceStockHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class KisWebSocketConfig implements WebSocketConfigurer{

    private final PriceStockHandler priceStockHandler;

    @Bean
    public WebSocketClient webSocketClient() {
        return new StandardWebSocketClient();
    }

    @Bean
    public WebSocketConnectionManager webSocketConnectionManager(WebSocketClient webSocketClient) {
        String appkey = "PSji3Tn79KSAKz0msD1dldUIXNre9JhlcJ2M";
        String appsecret = "q5OxO241o89X0qoz+6i0Zh7+Xvg4nSHEvFdpU7KYJECpnJ4I4L9Lxp56kZVfU3XsKiuRm5FcmFMB5pPEq+RPlLl6pHo3YIPUdX33OZW+tq7VXE89BYwzqCCrqnL+8Efn/srraX6maHl+nPwJOYkn2tjst628ltU0w82nB7l0iDrXBkNXGJY=";

        PriceStockHandler handler = new PriceStockHandler(appkey, appsecret);

        WebSocketConnectionManager manager = new WebSocketConnectionManager(
            webSocketClient,
            handler,
            "ws://ops.koreainvestment.com:21000"
        );
        manager.setAutoStartup(true); // 자동 시작 설정
        return manager;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(priceStockHandler, "/ws/real-time-stocks")
            .setAllowedOrigins("*");
    }
}
