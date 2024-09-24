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

const StyledInput = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 그림자 크기 및 투명도 조정 */
  padding: 10px 20px;
  width: 450px;
  height: 45px;
  margin: 15px 10px;
  font-size: 1.1rem;
  background-color: rgba(254, 254, 254, 0.2);

  &:focus {
    box-shadow: 0 0 10px rgba(81, 203, 238, 0.5);
  }

  ::placeholder {
    color: rgba(254, 254, 254, 0.9);
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
