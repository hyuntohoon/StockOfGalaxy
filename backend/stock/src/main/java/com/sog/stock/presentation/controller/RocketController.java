package com.sog.stock.presentation.controller;

import com.sog.stock.application.service.StockService;
import com.sog.stock.domain.dto.rocket.RocketAddRequestDTO;
import com.sog.stock.domain.dto.rocket.RocketResponseDTO;
import com.sog.stock.domain.dto.rocket.RocketResponseListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/stock")
public class RocketController {

    private final StockService stockService;

    // 로켓 전체 조회
    @GetMapping("/rocket/{stockCode}")
    public ResponseEntity<?> rocketList(@PathVariable String stockCode) {
        // stockService에서 로켓 목록 가져오기 (비동기 Mono 처리)
        return stockService.getAllRocketsByStockCode(stockCode)
            .map(rocketResponseList -> new ResponseEntity<>(rocketResponseList, HttpStatus.OK))
            .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND))
            .block(); // block()을 사용하여 비동기 처리 결과를 동기적으로 반환
    }

    // 로켓 상세 조회
    @GetMapping("/rocket/{rocketId}/info")
    public Mono<ResponseEntity<RocketResponseDTO>> getRocketById(@PathVariable int rocketId) {
        return stockService.getRocketById(rocketId)
            .map(rocket -> ResponseEntity.ok(rocket))
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // 상위 7개 조회
    @GetMapping("/rocket/{stockCode}/top7")
    public Mono<ResponseEntity<RocketResponseListDTO>> getLimitedRockets(
        @PathVariable String stockCode) {
        return stockService.getLimitedRocketsByStockCode(stockCode, 7)
            .map(ResponseEntity::ok);
    }


    // 로켓 삭제
    @DeleteMapping("/rocket/{rocketId}/member/{memberId}")
    public ResponseEntity<?> deleteRocket(@PathVariable int rocketId, @PathVariable Long memberId) {
        boolean isDeleted = stockService.deleteRocket(rocketId, memberId);
        if (isDeleted) {
            return new ResponseEntity<>("로켓 삭제가 정상적으로 완료되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("삭제에 오류가 발생했습니다.", HttpStatus.NOT_FOUND);
        }
    }

    // 로켓 작성
    @PostMapping("/rocket")
    public ResponseEntity<?> addRocket(@RequestBody RocketAddRequestDTO rocketAddRequestDTO) {
        stockService.addRocket(rocketAddRequestDTO);
        return new ResponseEntity<>("로켓 등록이 정상적으로 완료되었습니다.", HttpStatus.CREATED);
    }


}
