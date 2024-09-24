"use client";

import LoginInputField from "../../atoms/user/LoginInputField";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginInputGroup = ({ setInputValue }) => {
  return (
    <>
      <Container>
        <LoginInputField
          type="text"
          placeholder="아이디를 입력하세요"
          setInputValue={setInputValue}
        />
        <LoginInputField
          type="password"
          placeholder="비밀번호룰 압력하세요"
          setInputValue={setInputValue}
        />
      </Container>
    </>
  );
};

export default LoginInputGroup;
