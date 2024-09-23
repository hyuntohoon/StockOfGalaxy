package com.sog.stock.domain.model;

import com.sog.stock.domain.dto.StockDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
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
    private Integer establishedYear; // YEAR type

    @Column(nullable = false)
    private String ceo;

    @Column(nullable = false)
    private String webSite;

    @Column(nullable = false)
    private Integer fiscalMonth;

    @Column(nullable = false)
    private Boolean isDelisted = false;

    @Column(nullable = false)
    private Integer dividendYear;

    @Column(nullable = false)
    private BigDecimal dividendAmount;

    @Column(nullable = false)
    private Integer dividendFrequency;

    @Column(nullable = false)
    private BigDecimal totalLiabilities;

    @Column(nullable = false)
    private BigDecimal totalEquity;

    @Column(nullable = false)
    private BigDecimal currentAssets;

    @Column(nullable = false)
    private BigDecimal currentLiabilities;

    // 일대다 관계 설정
    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<DailyStockHistory> dailyStockHistories = new ArrayList<>();

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<Rocket> rockets = new ArrayList<>();

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<FinancialStatements> financialStatements = new ArrayList<>();

    // Dto to entity
    public static Stock fromDTO(StockDTO dto) {
        return Stock.builder()
            .stockCode(dto.getStockCode())
            .companyName(dto.getCompanyName())
            .companyDescription(dto.getCompanyDescription())
            .establishedYear(dto.getEstablishedYear())
            .ceo(dto.getCeo())
            .webSite(dto.getWebSite())
            .fiscalMonth(dto.getFiscalMonth())
            .isDelisted(dto.isDelisted())
            .dividendYear(dto.getDividendYear())
            .dividendAmount(dto.getDividendAmount())
            .dividendFrequency(dto.getDividendFrequency())
            .build();
    }

    // entity to dto
    public StockDTO toDTO() {
        return StockDTO.builder()
            .stockCode(this.stockCode)
            .companyName(this.companyName)
            .companyDescription(this.companyDescription)
            .establishedYear(this.establishedYear)
            .ceo(this.ceo)
            .webSite(this.webSite)
            .fiscalMonth(this.fiscalMonth)
            .isDelisted(this.isDelisted)
            .dividendYear(this.dividendYear)
            .dividendAmount(this.dividendAmount)
            .dividendFrequency(this.dividendFrequency)
            .build();
    }

}
