package com.sog.user.domain.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoForStockResponseDTO {

    private String nickname;
    private Integer characterType;

}
