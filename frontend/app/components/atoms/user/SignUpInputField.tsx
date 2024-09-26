"use client";

import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { userIdValidate } from "@/app/utils/apis/users/signup";
import { FormInput, CheckButton } from "@/app/styles/user";
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
  margin: 0px 10px;
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
      <FormInput
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
