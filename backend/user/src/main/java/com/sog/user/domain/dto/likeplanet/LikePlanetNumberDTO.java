package com.sog.user.domain.dto.likeplanet;

import com.sog.user.domain.model.LikedStock;
import com.sog.user.domain.model.LikedStockId;
import com.sog.user.domain.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikePlanetNumberDTO {

    private String stockCode;
    private String stockName;

    public LikedStock toEntity(Member member) {
        return LikedStock.builder()
            .likedStockId(new LikedStockId(member.getMemberId(), stockCode)) // 복합키
            .member(member)
            .build();
    }

}
