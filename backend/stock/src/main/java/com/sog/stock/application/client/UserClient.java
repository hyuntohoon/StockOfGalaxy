package com.sog.stock.application.client;

import com.sog.stock.domain.dto.user.UserInfoResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UserClient {

    private final WebClient webClient;

    public UserClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(
            "http://user-service.backcd.svc.cluster.local:80/api").build();
//            "http://localhost:8080/api").build();
    }

    // 유저 정보를 가져오는 메서드
    public Mono<UserInfoResponseDTO> getUserInfo(Long memberId) {
        return webClient.get()
            .uri("/user/info/{memberId}", memberId)
            .retrieve()
            .bodyToMono(UserInfoResponseDTO.class);
    }


}
