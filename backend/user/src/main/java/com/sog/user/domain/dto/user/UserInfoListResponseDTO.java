package com.sog.user.domain.dto.user;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoListResponseDTO {

    List<UserInfoToSingleResponseDTO> members;

}
