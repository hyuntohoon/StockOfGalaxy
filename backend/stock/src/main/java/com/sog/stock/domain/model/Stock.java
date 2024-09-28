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
    private String stock_code;

    @Column(nullable = false)
    private String corp_name;

    @Column(nullable = false)
    private String corp_description;

    @Column(nullable = false)
    private Integer est_dt; // YEAR type

    @Column(nullable = false)
    private String ceo_nm;

    @Column(nullable = false)
    private String hm_url;

    @Column(nullable = false)
    private Integer acc_mt;

    @Column(nullable = false)
    private Boolean is_delisted = false;

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
            .stock_code(dto.getStockCode())
            .corp_name(dto.getCompanyName())
            .corp_description(dto.getCompanyDescription())
            .est_dt(dto.getEstablishedYear())
            .ceo_nm(dto.getCeo())
            .hm_url(dto.getWebSite())
            .acc_mt(dto.getFiscalMonth())
            .is_delisted(dto.isDelisted())
            .build();
    }

    // entity to dto
    public StockDTO toDTO() {
        return StockDTO.builder()
            .stockCode(this.stock_code)
            .companyName(this.corp_name)
            .companyDescription(this.corp_description)
            .establishedYear(this.est_dt)
            .ceo(this.ceo_nm)
            .webSite(this.hm_url)
            .fiscalMonth(this.acc_mt)
            .isDelisted(this.is_delisted)
            .build();
    }

}
