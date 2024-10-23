package com.sog.user.application.service.likeplanet;

import com.sog.user.application.client.StockServiceClient;
import com.sog.user.domain.dto.likeplanet.LikePlanetListDTO;
import com.sog.user.domain.dto.likeplanet.LikePlanetNumberDTO;
import com.sog.user.domain.model.LikedStock;
import com.sog.user.domain.model.LikedStockId;
import com.sog.user.domain.model.Member;
import com.sog.user.domain.repository.LikePlanetRepository;
import com.sog.user.domain.repository.UserRepository;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@RequiredArgsConstructor
@Service
public class LikePlanetServiceImpl implements LikePlanetService {

    private final UserRepository userRepository;
    private final LikePlanetRepository likePlanetRepository;
    private final StockServiceClient stockServiceClient;

    // 관심행성 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public LikePlanetListDTO getLikePlanetList(long memberId) {
        LikePlanetListDTO likeListDTO = new LikePlanetListDTO();
        // db에 접근해서 memberId로 관심 행성 조회
        List<LikedStock> stockList = likePlanetRepository.findByLikedStockIdMemberId(memberId);

        // 각각의 종목 코드에 대해 주식 서버에서 종목명 조회 후 매핑
        List<Mono<LikePlanetNumberDTO>> likePlanetMonos = stockList.stream()
            .map(likedStock -> {
                String stockCode = likedStock.getLikedStockId().getStockCode();
                // 종목명을 가져오는 비동기 호출
                return stockServiceClient.getStockName(stockCode)
                    .map(stockNameResponseDTO ->
                        new LikePlanetNumberDTO(stockCode, stockNameResponseDTO.getStockName())
                    );
            })
            .collect(Collectors.toList());

        // 모든 비동기 작업이 완료되면 결과를 모아서 반환
        Mono<List<LikePlanetNumberDTO>> likePlanetListMono = Mono.zip(likePlanetMonos, results ->
            Arrays.stream(results)
                .map(result -> (LikePlanetNumberDTO) result)
                .collect(Collectors.toList())
        );

        // 동기적으로 결과를 기다리고 처리
        List<LikePlanetNumberDTO> likePlanetList = likePlanetListMono.block();
        likeListDTO.setLikeplanetList(likePlanetList);

        return likeListDTO;
    }


    // 관심행성 추가
    @Override
    @Transactional
    public void addLikePlanet(LikePlanetNumberDTO likePlanetNumberDTO, long memberId) {
        // member 조회
        Member member = userRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 멤버를 찾을 수 없습니다."));

        // dto to entity
        LikedStock likedStock = likePlanetNumberDTO.toEntity(member);
        likePlanetRepository.save(likedStock);
    }

    // 관심행성 삭제
    @Override
    @Transactional
    public void deleteLikePlanet(String stockCode, long memberId) {
        Member member = userRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 멤버를 찾을 수 없습니다."));

        // 복합키로 삭제
        LikedStockId likedStockId = new LikedStockId(member.getMemberId(),
            stockCode);
        likePlanetRepository.deleteByLikedStockId(likedStockId);
    }
}
