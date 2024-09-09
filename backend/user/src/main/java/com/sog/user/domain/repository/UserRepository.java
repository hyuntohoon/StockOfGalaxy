package com.sog.user.domain.repository;

import com.sog.user.domain.model.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableRedisRepositories
public interface UserRepository extends JpaRepository<Member, Long> {

    // 각 회원의 pk값으로 조회
    Optional<Member> findById(Long memberId);

    // 회원 아이디로 조회
    Optional<Member> findByUserId(String userId);

    // 사용자 id 존재 여부 확인 메서드 -> 중복확인
    boolean existsByUserId(String userId);

}
