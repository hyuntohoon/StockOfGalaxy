"use client";

import styled from "@emotion/styled";
import React from "react";

interface StyledLoginButtonProps {
  value: string;
}

const StyledLoginButton = styled.input<StyledLoginButtonProps>`
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

interface LoginButtonProps {
  value: string;
  onClickProps: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ value, onClickProps }) => {
  return (
    <StyledLoginButton
      type="button"
      value={value}
      onClick={onClickProps}
    />
  );
};

export default LoginButton;
