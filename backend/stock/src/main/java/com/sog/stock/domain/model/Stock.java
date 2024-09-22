package com.sog.stock.domain.model;

import com.sog.stock.domain.dto.StockAddRequestDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
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
@Table(name = "stock")
public class Stock {

    @Id
    private String stockCode;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String companyDescription;

    @Column(nullable = false)
    private Boolean isDelisted = false;

    // 일대다 관계 설정
    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<DailyStockHistory> dailyStockHistories = new ArrayList<>();

    // Dto to entity
    public static Stock fromDTO(StockAddRequestDTO dto) {
        return Stock.builder()
            .stockCode(dto.getStockCode())
            .companyName(dto.getCompanyName())
            .companyDescription(dto.getCompanyDescription())
            .isDelisted(dto.isDelisted())
            .build();
    }
}
