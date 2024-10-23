package com.sog.stock.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sog.stock.domain.dto.rocket.RocketAddRequestDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "rocket")
public class Rocket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rocket_id")
    private Integer rocketId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer stockPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "rocket_created_at", nullable = false)
    private LocalDateTime rocketCreatedAt;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    // 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_code", nullable = false)
    private Stock stock;

    // 소프트 삭제 처리 메서드 (필드 상태만 변경)
    public void markAsDeleted() {
        this.isDeleted = true;  // 상태만 변경
    }

    public static Rocket createRocket(RocketAddRequestDTO rocketAddRequestDTO, Stock stock) {
        return Rocket.builder()
            .memberId(rocketAddRequestDTO.getMemberId())
            .content(rocketAddRequestDTO.getMessage())
            .stockPrice(rocketAddRequestDTO.getPrice())
            .rocketCreatedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul"))) // 여기서 현재 시간을 설정
            .isDeleted(false)
            .stock(stock)
            .build();
    }

}
