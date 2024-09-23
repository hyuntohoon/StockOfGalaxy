package com.sog.stock.domain.model;

import com.sog.stock.domain.dto.RocketAddRequestDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private Integer rocketId;

    @Column(nullable = false)
    private LocalDate dailyStockHistoryDate;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer stockPrice;

    @Column(nullable = false)
    private LocalDateTime rocketCreatedAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @Column(nullable = false)
    private Long memberId;

    // 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_code", nullable = false)
    private Stock stock;

    // dto to entity
    public static Rocket fromDTO(RocketAddRequestDTO rocketAddRequestDTO) {
        return Rocket.builder()
            .memberId(rocketAddRequestDTO.getMemberId())
            .content(rocketAddRequestDTO.getMessage())
            .stockPrice(rocketAddRequestDTO.getPrice())
            .rocketCreatedAt(rocketAddRequestDTO.getCreatedAt())
            .isDeleted(false)
            .build();
    }

}
