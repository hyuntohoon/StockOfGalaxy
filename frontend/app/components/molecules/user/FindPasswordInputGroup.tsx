"use client";

import FindPasswordInputField from "../../atoms/user/FindPasswordInputField";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0px;
`;

const FindPasswordInputGroup = ({ setIsAuthenticated }) => {
  return (
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
  );
};

export default FindPasswordInputGroup;
