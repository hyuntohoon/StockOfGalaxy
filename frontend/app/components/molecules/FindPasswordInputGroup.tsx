"use client";

import FindPasswordInputField from "../atoms/FindPasswordInputField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FindPasswordInputGroup = ({ setIsAuthenticated }) => {
  return (
    <>
      <Container>
        <FindPasswordInputField
          type="email"
          placeholder="이메일"
          setIsAuthenticated={setIsAuthenticated}
        />
        <FindPasswordInputField
          type="text"
          placeholder="인증번호"
          setIsAuthenticated={setIsAuthenticated}
        />
      </Container>
    </>
  );
};

export default FindPasswordInputGroup;
