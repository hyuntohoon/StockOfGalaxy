"use client";

import styled from "@emotion/styled";
import { ChangeEvent } from "react";

// 타입스크립트를 사용하는 경우, Props 인터페이스를 정의합니다.
interface LoginInputFieldProps {
  type: string;
  placeholder: string;
  setPassword: (value: string) => void;
}

// Emotion을 사용하여 스타일드 컴포넌트 정의
const InputField = styled.input`
  color: #9b9b9b;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px 20px;
  width: 450px;
  height: 45px;
  margin: 15px 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0e224d;
    box-shadow: 0 4px 8px rgba(14, 34, 77, 0.2);
  }

  &:focus {
    border-color: #0e224d;
    outline: none;
    box-shadow: 0 0 10px rgba(14, 34, 77, 0.5);
  }

  &::placeholder {
    color: #b0b0b3;
    opacity: 1; /* Firefox */
  }
`;

const LoginInputField: React.FC<LoginInputFieldProps> = ({
  type,
  placeholder,
  setPassword,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <InputField
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default LoginInputField;
