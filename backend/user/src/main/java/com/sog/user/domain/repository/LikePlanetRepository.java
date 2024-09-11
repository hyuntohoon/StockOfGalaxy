package com.sog.user.domain.repository;

import com.sog.user.domain.model.LikedStock;
import com.sog.user.domain.model.LikedStockId;
import com.sog.user.domain.model.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikePlanetRepository extends JpaRepository<LikedStock, LikedStockId> {

    // memberId로 관심 행성 목록을 조회하는 메서드
    List<LikedStock> findByLikedStockIdMemberId(Long memberId);

    // 복합키로 삭제하는 메서드
    void deleteByLikedStockId(LikedStockId likedStockId);
}
