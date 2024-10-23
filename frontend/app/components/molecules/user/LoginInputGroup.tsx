"use client";

import LoginInputField from "../../atoms/user/LoginInputField";
import styled from "@emotion/styled"; // Emotion styled로 변경

// Emotion을 사용하여 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 입력 필드 간 간격 추가 */
`;

interface LoginInputGroupProps {
  setInputValue: React.Dispatch<React.SetStateAction<{ id: string; password: string }>>;
}

const LoginInputGroup: React.FC<LoginInputGroupProps> = ({ setInputValue }) => {
  return (
    <Container>
      <LoginInputField
        type="text"
        placeholder="아이디를 입력하세요"
        setInputValue={setInputValue}
      />
      <LoginInputField
        type="password"
        placeholder="비밀번호를 입력하세요" 
        setInputValue={setInputValue}
      />
    </Container>
  );
};

export default LoginInputGroup;
