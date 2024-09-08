"use client";

import LoginInputField from "../atoms/LoginInputField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginInputGroup = () => {
  return (
    <>
      <Container>
        <LoginInputField type="text" placeholder="아이디를 입력하세요" />
        <LoginInputField type="password" placeholder="비밀번호룰 압력하세요" />
      </Container>
    </>
  );
};

export default LoginInputGroup;
