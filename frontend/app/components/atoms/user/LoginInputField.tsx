"use client";

import styled from "@emotion/styled";
import React from "react";

// Props 타입 정의
interface LoginInputFieldProps {
  type: "text" | "password";
  placeholder: string;
  setInputValue: React.Dispatch<
    React.SetStateAction<{ id: string; password: string }>
  >;
}

// Emotion을 사용하여 스타일링
const StyledInput = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 450px;
  height: 45px;
  margin: 15px 10px;
  font-size: 1.1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }

  ::placeholder {
    color: #cccccc;
  }
`;

const LoginInputField: React.FC<LoginInputFieldProps> = ({
  type,
  placeholder,
  setInputValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [type === "password" ? type : "id"]: e.target.value,
    }));
  };

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      aria-label={placeholder}
    />
  );
};

export default LoginInputField;
