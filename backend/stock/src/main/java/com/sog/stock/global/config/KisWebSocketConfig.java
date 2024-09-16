package com.sog.stock.global.config;

import com.sog.stock.application.service.KisTokenService;
import com.sog.stock.application.service.StockService;
import com.sog.stock.global.websocket.PriceStockHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;

@Configuration
public class KisWebSocketConfig {

    @Value("${kis.websocket.domain}")
    private String kisWebSocketDomain;

    private final KisTokenService kisTokenService;
    private final StockService stockService;

    public KisWebSocketConfig(KisTokenService kisTokenService, StockService stockService) {
        this.kisTokenService = kisTokenService;
        this.stockService = stockService;
    }

    @Bean
    public PriceStockHandler priceStockHandler() {
        return new PriceStockHandler(stockService, kisTokenService);
    }

    @Bean
    public WebSocketClient webSocketClient() {
        return new ReactorNettyWebSocketClient();
    }
}
