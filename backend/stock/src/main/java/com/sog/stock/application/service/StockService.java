package com.sog.stock.application.service;

import org.springframework.stereotype.Service;

@Service
public interface StockService {
    public void processRealTimeStockData(String message, String token);
    public void fetchClosingStockData();
}
