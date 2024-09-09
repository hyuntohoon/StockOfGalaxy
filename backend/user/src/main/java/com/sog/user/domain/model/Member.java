package com.sog.user.domain.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "members")
public class Member implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "character_type", nullable = false)
    private Integer characterType = 0;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "is_quit", nullable = false)
    private Boolean isQuit = false;

    @OneToMany(mappedBy = "likedStock", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LikedStock> likedStocks = new ArrayList<>();

    /**
     * UserDetails
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
        throws UsernameNotFoundException {
        return List.of(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    /**
     * 외부 호출 메서드
     * */
    // 비밀번호 변경
    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    // 회원 탈퇴 처리 메서드 (soft delete)
    public void quit() {
        if (!this.isQuit) {
            this.isQuit = true;  // isQuit 값을 true로 변경
        }
    }

}
