package com.sog.stock.domain.dto.kis;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

@Data
public class KisMinuteStockResponseDTO {

    @JsonProperty("output1")
    private Output1 output1;

    @JsonProperty("output2")
    private List<Output2> output2;

    @Data
    public static class Output1 {

        @JsonProperty("stck_prpr")
        private String stckPrpr; // 현재가

        @JsonProperty("prdy_vrss")
        private String prdyVrss; // 전일대비

        @JsonProperty("prdy_vrss_sign")
        private String prdyVrssSign; // 전일대비 부호

        @JsonProperty("prdy_ctrt")
        private String prdyCtrt; // 전일대비율

        @JsonProperty("acml_vol")
        private String acmlVol; // 누적 거래량

        @JsonProperty("acml_tr_pbmn")
        private String acmlTrPbmn; // 누적 거래대금
    }

    @Data
    public static class Output2 {

        @JsonProperty("stck_bsop_date")
        private String stckBsopDate; // 주식 영업 일자

        @JsonProperty("stck_cntg_hour")
        private String stckCntgHour; // 시간

        @JsonProperty("stck_prpr")
        private String stckPrpr; // 현재가

        @JsonProperty("stck_oprc")
        private String stckOprc; // 시가

        @JsonProperty("stck_hgpr")
        private String stckHgpr; // 고가

        @JsonProperty("stck_lwpr")
        private String stckLwpr; // 저가

        @JsonProperty("cntg_vol")
        private String cntgVol; // 거래량

        @JsonProperty("acml_tr_pbmn")
        private String acmlTrPbmn; // 누적 거래대금
    }


}
