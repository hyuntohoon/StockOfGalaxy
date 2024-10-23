package com.sog.user.application.service.likeplanet;

import com.sog.user.domain.dto.likeplanet.LikePlanetListDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetNumberDTO;

public interface LikePlanetService {

    // 관심행성 리스트 조회
    public LikePlanetListDTO getLikePlanetList(long memberId);

    // 관심행성 추가
    public void addLikePlanet(LikePlanetNumberDTO likePlanetNumberDTO, long memberId);

    // 관심행성 삭제
    public void deleteLikePlanet(String stockCode, long memberId);

}
