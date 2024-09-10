package com.sog.user.application.service.likeplanet;

import com.sog.user.domain.dto.likeplanet.LikePlanetDeleteDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetListDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetNumberDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetRequestDTO;
import com.sog.user.domain.model.LikedStock;
import com.sog.user.domain.model.LikedStockId;
import com.sog.user.domain.model.Member;
import com.sog.user.domain.repository.LikePlanetRepository;
import com.sog.user.domain.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikePlanetServiceImpl implements LikePlanetService {

    private final UserRepository userRepository;
    private final LikePlanetRepository likePlanetRepository;

    // 관심행성 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public LikePlanetListDTO getLikePlanetList(long memberId) {
        LikePlanetListDTO likeListDTO = new LikePlanetListDTO();
        // db에 접근을해서
        List<LikedStock> stockList = likePlanetRepository.findByLikedStockIdMemberId(memberId);

        // entity 리스트를 dto로 변환
        List<LikePlanetNumberDTO> likePlanetList = stockList.stream()
            .map(likedStock -> new LikePlanetNumberDTO(likedStock.getLikedStockId().getStockCode()))
            .collect(Collectors.toList());

        likeListDTO.setLikeplanetList(likePlanetList);
        // list에 담아서 해당 list를 return해준다.
        return likeListDTO;
    }

    // 관심행성 추가
    @Override
    @Transactional
    public void addLikePlanet(LikePlanetRequestDTO likePlanetRequestDTO) {
        // member 조회
        Member member = userRepository.findById(likePlanetRequestDTO.getMemberId())
            .orElseThrow(() -> new IllegalArgumentException("해당 멤버를 찾을 수 없습니다."));

        // dto to entity
        LikedStock likedStock = likePlanetRequestDTO.toEntity(member);
        likePlanetRepository.save(likedStock);
    }

    // 관심행성 삭제
    @Override
    @Transactional
    public void deleteLikePlanet(LikePlanetDeleteDTO likePlanetDeleteDTO) {
        Member member = userRepository.findById(likePlanetDeleteDTO.getMemberId())
            .orElseThrow(() -> new IllegalArgumentException("해당 멤버를 찾을 수 없습니다."));

        // 복합키로 삭제
        LikedStockId likedStockId = new LikedStockId(member.getMemberId(),
            likePlanetDeleteDTO.getStockCode());
        likePlanetRepository.deleteByLikedStockId(likedStockId);
    }
}
