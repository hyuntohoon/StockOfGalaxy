package com.sog.stock.domain.dto.news;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsCountByDateResponseDTO {

    private LocalDate date; // 뉴스 발행 날짜
    private Integer count; // 뉴스 기사수
}
