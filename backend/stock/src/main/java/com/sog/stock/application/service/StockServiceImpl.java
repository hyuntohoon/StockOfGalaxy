package com.sog.stock.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void processRealTimeStockData(String message, String token) {
        messagingTemplate.convertAndSend("/topic/real-time-stock", message);  // 다수의 사용자에게 전송

    }

    @Override
    public void fetchClosingStockData() {

    }
}
