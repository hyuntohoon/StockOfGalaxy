"use client";

import { useRouter } from "next/navigation";
import LoginButton from "../../atoms/user/LoginButton";
import { login } from "@/app/utils/apis/users";
import {useAccessToken, useIsLoggedIn, useMemberId, useUser } from "@/app/store/userSlice";
import styled from "@emotion/styled"; // Emotion styled import
// Emotion을 사용하여 스타일링
const ButtonContainer = styled.div`
  display: flex;
  gap: 40px; /* 버튼 간 간격 설정 */
  margin-top: 20px; /* 위쪽 여백 추가 */
`;

const LoginButtonGroup = ({ inputValue }) => {
  const router = useRouter();
  const { setAccessToken } = useAccessToken();
  const {setIsLoggedIn} = useIsLoggedIn();
  
  const handleLogin = async () => {
    const success = await login(inputValue, setAccessToken, setIsLoggedIn, useMemberId, useUser);
    if (success) {
      router.push("/"); // 로그인 성공 시 메인 페이지로 이동
    }
  };

  return (
    <ButtonContainer>
      <LoginButton
        value="로그인"
        onClickProps={handleLogin} 
      />
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
