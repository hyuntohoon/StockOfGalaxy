package com.sog.stock.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class SogWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트에서 구독할 수 있는 topic 경로 설정
        config.enableSimpleBroker("/topic");  // 브로커 경로, 실시간 데이터 전달
        config.setApplicationDestinationPrefixes("/app");  // 서버로의 메시지 전송 경로
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 프론트엔드에서 WebSocket 연결을 요청하는 경로
        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();  // SockJS를 이용해 연결 설정
    }
}
