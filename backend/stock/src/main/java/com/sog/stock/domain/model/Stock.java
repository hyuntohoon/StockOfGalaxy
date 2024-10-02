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
    @Column(name = "stock_code")
    private String stockCode;

    @Column(name = "corp_name", nullable = false)
    private String corpName;

    @Column(name = "corp_description", nullable = false)
    private String corpDescription;

    @Column(name = "est_dt", nullable = false)
    private Integer estDt;

    @Column(name = "ceo_nm", nullable = false)
    private String ceoNm;

    @Column(name = "hm_url", nullable = false)
    private String hmUrl;

    @Column(name = "acc_mt", nullable = false)
    private Integer accMt;

    @Column(name = "is_delisted", nullable = false)
    private Boolean isDelisted = false;

    // 일대다 관계 설정
    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<DailyStockHistory> dailyStockHistories = new ArrayList<>();

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<Rocket> rockets = new ArrayList<>();

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<FinancialStatements> financialStatements = new ArrayList<>();

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    private List<QuarterStockHistory> quarterStockHistories = new ArrayList<>();

    // Dto to entity
    public static Stock fromDTO(StockDTO dto) {
        return Stock.builder()
            .stockCode(dto.getStockCode())
            .corpName(dto.getCompanyName())
            .corpDescription(dto.getCompanyDescription())
            .estDt(dto.getEstablishedYear())
            .ceoNm(dto.getCeo())
            .hmUrl(dto.getWebSite())
            .accMt(dto.getFiscalMonth())
            .isDelisted(dto.isDelisted())
            .build();
    }

    // entity to dto
    public StockDTO toDTO() {
        return StockDTO.builder()
            .stockCode(this.stockCode)
            .companyName(this.corpName)
            .companyDescription(this.corpDescription)
            .establishedYear(this.estDt)
            .ceo(this.ceoNm)
            .webSite(this.hmUrl)
            .fiscalMonth(this.accMt)
            .isDelisted(this.isDelisted)
            .build();
    }
}
