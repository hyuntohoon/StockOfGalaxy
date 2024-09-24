"use client";

import styled from "@emotion/styled";
import React from "react";

interface StyledLoginButtonProps {
  value: string;
  primary?: boolean; // 주 버튼이면 true, 아니면 false
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
    value === "회원가입" ? "linear-gradient(145deg, #6247AA, #5B2AC5)" : "#0E224D"};
  color: ${({ value }) => (value === "회원가입" ? "#0E224D" : "white")};
  cursor: pointer;
  border: ${({ value }) =>
    value === "회원가입" ? "1px solid #0E224D" : "none"};
  opacity: 0.9;
    transition: all 0.3s ease;


  &:hover {
    opacity: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(2px);
    box-shadow: ${({ primary }) => (primary ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "none")};
  }
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
