package com.sog.stock.domain.model;

import com.sog.stock.domain.enums.QuarterType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "quarter_stock_history")
public class QuarterStockHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quarterStockHistoryId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuarterType quarterType;

    @Column(nullable = false)
    private String stock_start_date;

    @Column(nullable = false)
    private Integer stock_open_price;

    @Column(nullable = false)
    private Integer stock_close_price;

    @Column(nullable = false)
    private Integer stock_high_price;

    @Column(nullable = false)
    private Integer stock_low_price;

    @Column(nullable = true)
    private Long stock_acml_vol;

    @Column(nullable = false)
    private Long stock_acml_tr_pbmn;

    // 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_code", nullable = false)
    private Stock stock;
}
