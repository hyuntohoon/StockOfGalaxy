package com.sog.stock.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MinuteStockPriceDTO {

    private String stckBsopDate; // 주식 영업 일자
    private String stckCntgHour; // 주식 체결 시간
    private String stckPrpr; // 주식 현재가
    private String stckOprc; // 주식 시가2
    private String stckHgpr; // 주식 최고가
    private String stckLwpr; // 주식 최저가
    private String cntgVol; // 체결 거래량
    private String acmlTrPbmn; // 누적 거래대금

}
