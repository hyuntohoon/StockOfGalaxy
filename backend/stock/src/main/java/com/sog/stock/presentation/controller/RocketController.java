package com.sog.stock.presentation.controller;

import com.sog.stock.application.service.StockService;
import com.sog.stock.domain.dto.rocket.RocketAddRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/rockets")
public class RocketController {

    private final StockService stockService;

    // 로켓 전체 조회
//    @GetMapping()
//
//    // 로켓 상세 조회
//    @GetMapping("/{rocketId}")

    // 로켓 삭제
    @DeleteMapping("{rocketId}/members/{memberId}")
    public ResponseEntity<?> deleteRocket(@PathVariable int rocketId, @PathVariable Long memberId) {
        boolean isDeleted = stockService.deleteRocket(rocketId, memberId);
        if (isDeleted) {
            return new ResponseEntity<>("로켓 삭제가 정상적으로 완료되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("삭제에 오류가 발생했습니다.", HttpStatus.NOT_FOUND);
        }
    }

    // 로켓 작성
    // memberId, nickname은 user서버 요청해서 받아와야됨(추후 수정)
    @PostMapping
    public ResponseEntity<?> addRocket(@RequestBody RocketAddRequestDTO rocketAddRequestDTO) {
        stockService.addRocket(rocketAddRequestDTO);
        return new ResponseEntity<>("로켓 등록이 정상적으로 완료되었습니다.", HttpStatus.CREATED);
    }


}
