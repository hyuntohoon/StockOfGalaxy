"use client";

import styled from "@emotion/styled";

const StyledLoginButton = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  width: 200px;
  height: 50px;
  margin: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: ${({ value }) =>
    value === "회원가입" ? "white" : "#0E224D"};
  color: ${({ value }) => (value === "회원가입" ? "#0E224D" : "white")};
  cursor: pointer;
  border: ${({ value }) =>
    value === "회원가입" ? "1px solid #0E224D" : "none"};
`;

const LoginButton = ({ value, onClickProps }) => {
  return (
    <StyledLoginButton
      type="button"
      value={value}
      onClick={() => {
        onClickProps();
      }}
    />
  );
};

export default LoginButton;
