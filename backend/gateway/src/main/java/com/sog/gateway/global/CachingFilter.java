package com.sog.gateway.global;

import com.sog.gateway.application.CacheService;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.reactivestreams.Publisher;

import java.nio.charset.StandardCharsets;

@Component
public class CachingFilter implements GlobalFilter {

    @Autowired
    private CacheService cacheService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String cacheKey = generateCacheKey(exchange);

        // 캐시 확인: Redis에 해당 key가 존재하면 바로 응답
        if (cacheService.hasKey(cacheKey)) {
            String cachedResponse = cacheService.getCache(cacheKey);
            byte[] responseBytes = cachedResponse.getBytes(StandardCharsets.UTF_8);
            exchange.getResponse().getHeaders().setContentLength(responseBytes.length);

            return exchange.getResponse().writeWith(
                Mono.just(exchange.getResponse().bufferFactory().wrap(responseBytes))
            );
        }

        // API 요청 후 응답을 Redis에 캐싱
        ServerHttpResponse originalResponse = exchange.getResponse();
        ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {
            @Override
            public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                return super.writeWith(Flux.from(body).map(dataBuffer -> {
                    byte[] content = new byte[dataBuffer.readableByteCount()];
                    dataBuffer.read(content);
                    DataBufferUtils.release(dataBuffer); // 메모리 해제

                    // JSON 데이터를 문자열로 Redis에 저장
                    String jsonResponse = new String(content, StandardCharsets.UTF_8);
                    cacheService.setCache(cacheKey, jsonResponse);

                    return originalResponse.bufferFactory().wrap(content);
                }));
            }

            @Override
            public Mono<Void> writeAndFlushWith(Publisher<? extends Publisher<? extends DataBuffer>> body) {
                return super.writeAndFlushWith(body);
            }
        };

        // 필터 체인으로 응답을 처리
        return chain.filter(exchange.mutate().response(decoratedResponse).build());
    }

    private String generateCacheKey(ServerWebExchange exchange) {
        return exchange.getRequest().getURI().toString(); // 요청 URI를 캐시 키로 사용
    }
}
