package com.sog.stock.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
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

}
