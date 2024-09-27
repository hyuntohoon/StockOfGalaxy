package com.sog.gateway.infrastructure;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<Object> {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Value("${jwt.secret}")
    private String secret;

    public JwtAuthenticationFilter() {
        super(Object.class);
    }

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey("Authorization")) {
                return onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
            }

            String token = request.getHeaders().getFirst("Authorization");

            // Bearer 토큰 형식 확인 및 추출
            if (token == null || token.isEmpty() || !token.startsWith("Bearer ")) {
                return onError(exchange, "Invalid Authorization header", HttpStatus.UNAUTHORIZED);
            }
            token = token.substring(7);

            try {
                // JWT 파싱 (Jwts.parser() 대신 Jwts.parserBuilder() 사용)
                Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

                String memberId = claims.get("memberId", String.class);

                // 요청에 "memberId" 헤더 추가
                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                    .header("memberId", memberId)  // 헤더 이름을 "memberId"로 변경
                    .build();

                return chain.filter(exchange.mutate().request(modifiedRequest).build());
            } catch (SignatureException e) {
                log.error("Invalid JWT signature", e);
                return onError(exchange, "Invalid token signature", HttpStatus.UNAUTHORIZED);
            } catch (Exception e) {
                log.error("JWT token parsing error", e);
                return onError(exchange, "Invalid token", HttpStatus.UNAUTHORIZED);
            }
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        log.error("JWT Authentication error: {}", err);
        return response.setComplete();
    }
}
