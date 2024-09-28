package com.sog.stock.domain.model;

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
import java.util.Date;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "daily_stock_history")
public class DailyStockHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dailyStockHistoryId;

    @Column(nullable = false)
    private String dailyStockHistoryDate;

    @Column(nullable = false)
    private Integer openPrice;

    @Column(nullable = false)
    private Integer closePrice;

    @Column(nullable = false)
    private Integer highPrice;

    @Column(nullable = false)
    private Integer lowPrice;

    @Column(nullable = true)
    private Long stockAcmlVol;

    @Column(nullable = false)
    private Long stockAcmlTrPbmn;

    @Column(nullable = false)
    private String prdyVrss;

    @Column(nullable = false)
    private String prdyVrssSign;

    @Column(nullable = false)
    private String prdyCtrt;

    // 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_code", nullable = false)
    private Stock stock;
}
