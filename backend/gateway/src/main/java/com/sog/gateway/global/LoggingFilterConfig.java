package com.sog.gateway.global;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class LoggingFilterConfig {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilterConfig.class);

    @Bean
    public GlobalFilter customLoggingFilter() {
        return (exchange, chain) -> {
            logger.info("Request URI: {}", exchange.getRequest().getURI());
            logger.info("Request Method: {}", exchange.getRequest().getMethod());

            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                logger.info("Response Status Code: {}", exchange.getResponse().getStatusCode());
            }));
        };
    }
}
