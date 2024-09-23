package com.sog.stock.domain.dto;

import java.util.List;
import lombok.Data;

@Data
public class HolidayAddListRequestDTO {

    private List<HolidayAddRequestDTO> holidays;

}
