package com.sog.gateway.application;

import org.springframework.stereotype.Service;

@Service
public class GatewayService {

    public String routeRequest(String request) {
        // 요청 라우팅 로직을 처리 (필요한 경우)
        return "Request routed to appropriate service";
    }
}