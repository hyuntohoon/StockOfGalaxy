package com.sog.stock.domain.model;

import com.sog.stock.domain.dto.HolidayAddRequestDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "stock_holiday")
public class StockHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stockHolidayId;

    @Column(nullable = false)
    private String stockDate;

    @Column(nullable = false)
    private String locDate;

    // Dto to entity
    public static StockHoliday fromDTO(HolidayAddRequestDTO holidayAddRequestDTO) {
        return StockHoliday.builder()
            .stockDate(holidayAddRequestDTO.getDateName())
            .locDate(holidayAddRequestDTO.getLocdate())
            .build();
    }


}
