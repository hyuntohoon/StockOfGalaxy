"use client";

import { useRouter } from "next/navigation";
import LoginButton from "../../atoms/user/LoginButton";
import { login } from "@/app/utils/apis/users";
import useAccessToken from "@/app/utils/libs/user/useAccessToken";
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

  return (
    <ButtonContainer>
      <LoginButton
        value="로그인"
        onClickProps={() => {
          login(inputValue, setAccessToken);
        }}
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
