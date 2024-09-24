"use client";

import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { userIdValidate } from "@/app/utils/apis/users/signup";

interface SignUpInputFieldProps {
  type: string;
  placeholder: string;
  setInfo: (value: string) => void;
  setIsAuthenticated?: (value: boolean) => void;
}

// Emotion을 사용하여 스타일드 컴포넌트 정의
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 450px;
  margin: 15px 10px;
`;

const InputField = styled.input`
  color: #9b9b9b;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  height: 40px;
  font-size: 1.1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

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

const CheckButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: #0e224d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1a3b6a;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #0e224d;
    transform: translateY(0);
  }
`;

const SignUpInputField: React.FC<SignUpInputFieldProps> = ({
  type,
  placeholder,
  setInfo,
  setIsAuthenticated,
}) => {
  const [userId, setUserId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setInfo(e.target.value);
  };

  const handleCheck = async () => {
    const res = await userIdValidate(userId);
    if (res === true && setIsAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  return (
    <InputContainer>
      <InputField
        type={type}
        placeholder={placeholder}
        value={userId}
        onChange={handleChange}
      />
      {placeholder === "아이디" && (
        <CheckButton onClick={handleCheck}>
          중복 확인
        </CheckButton>
      )}
    </InputContainer>
  );
};

export default SignUpInputField;
