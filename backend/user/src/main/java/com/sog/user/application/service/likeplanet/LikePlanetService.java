package com.sog.user.application.service.likeplanet;

import com.sog.user.domain.dto.likeplanet.LikePlanetListDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetNumberDTO;

public interface LikePlanetService {

    // 관심행성 리스트 조회
    public LikePlanetListDTO getLikePlanetList(Long memberId);

    // 관심행성 추가
    public LikePlanetNumberDTO getLikePlanetNumber(Long memberId);

    // 관심행성 삭제
    public LikePlanetNumberDTO deleteLikePlanet(Long memberId);

}
