"use client";

import { useRouter } from "next/navigation";
import LoginButton from "../../atoms/user/LoginButton";
import { login, getInfo } from "@/app/utils/apis/users";
import { useAccessToken, useIsLoggedIn, useMemberId, useUser } from "@/app/store/userSlice";
import { useEffect } from "react";
import styled from "@emotion/styled"; // Emotion styled import

// Emotion을 사용하여 스타일링
const ButtonContainer = styled.div`
  display: flex;
  gap: 40px; /* 버튼 간 간격 설정 */
  margin-top: 20px; /* 위쪽 여백 추가 */
`;

const LoginButtonGroup = ({ inputValue }) => {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAccessToken();
  const { setIsLoggedIn } = useIsLoggedIn();
  const { setMemberId } = useMemberId();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const resp = await login(inputValue, setAccessToken, setIsLoggedIn);

      if (resp) {
        setMemberId(resp);
      } else {
        console.error("로그인 실패");
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const userInfo = await getInfo(accessToken, setAccessToken);
          setUser(userInfo);
          router.push("/"); // 로그인 성공 시 메인 페이지로 이동
        } catch (error) {
          console.error("사용자 정보 가져오기 중 오류 발생:", error);
        }
      };

      fetchUserInfo();
    }
  }, [accessToken]); // accessToken이 변경될 때만 실행

  return (
    <ButtonContainer>
      <LoginButton value="로그인" onClickProps={handleLogin} />
      <LoginButton
        value="회원가입"
        onClickProps={() => {
          router.push("/sign");
        }}
      />
    </ButtonContainer>
  );
};

export default LoginButtonGroup;
