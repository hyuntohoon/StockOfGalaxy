package com.sog.user.domain.dto.likeplanet;

import com.sog.user.domain.model.LikedStock;
import com.sog.user.domain.model.LikedStockId;
import com.sog.user.domain.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikePlanetRequestDTO {

    private long memberId;
    private String stockCode;

    public LikedStock toEntity(Member member) {
        return LikedStock.builder()
            .likedStockId(new LikedStockId(memberId, stockCode)) // 복합키
            .member(member)
            .build();
    }
}
