package com.sog.gateway.presentation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GatewayRestController {

    @GetMapping("/status")
    public String status() {
        return "Gateway is running";
    }
}