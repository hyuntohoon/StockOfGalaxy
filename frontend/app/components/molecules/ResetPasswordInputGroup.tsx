"use client";

import LoginInputField from "../atoms/LoginInputField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResetPasswordInputGroup = () => {
  return (
    <>
      <Container>
        <LoginInputField type="password" placeholder="새 비밀번호" />
        <LoginInputField type="password" placeholder="새 비밀번호 확인" />
      </Container>
    </>
  );
};

export default ResetPasswordInputGroup;
