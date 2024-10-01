package com.sog.stock.domain.dto.kis;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.result.Output;

@Data
public class KisPresentPriceResponseDTO {

    @JsonProperty("output")
    private Output output;

    @Data
    public static class Output {

        @JsonProperty("stck_prpr")
        private String stckPrpr; // 현재가

        @JsonProperty("prdy_vrss")
        private String prdyVrss; // 전일대비

        @JsonProperty("prdy_vrss_sign")
        private String prdyVrssSign; // 전일대비 부호

        @JsonProperty("prdy_ctrt")
        private String prdyCtrt; // 전일대비율
    }

}
