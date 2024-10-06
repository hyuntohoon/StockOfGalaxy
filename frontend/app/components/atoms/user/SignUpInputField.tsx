"use client";

import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { userIdValidate } from "@/app/utils/apis/users/signup";
import { FormInput, CheckButton } from "@/app/styles/user";
import {
  validateUserId,
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/app/utils/apis/users/signup";

interface SignUpInputFieldProps {
  type: string;
  placeholder: string;
  setInfo: (value: string) => void;
  setIsAuthenticated?: (value: boolean) => void;
  password?: string;
  passwordCheck?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// Emotion을 사용하여 스타일드 컴포넌트 정의
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 450px;
  margin: 0px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: 0px;
  padding: 10px 10px;
  margin-bottom: 10px;
  text-align: left;
`;

const SignUpInputField: React.FC<SignUpInputFieldProps> = ({
  type,
  placeholder,
  setInfo,
  setIsAuthenticated,
  password,
  passwordCheck,
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

  let errorMessage = "";

  if (placeholder === "아이디") {
    errorMessage = validateUserId(userId)
      ? ""
      : "영문, 숫자만 포함한 5~20자의 아이디를 입력해주세요.";
  } else if (placeholder === "비밀번호") {
    errorMessage = validatePassword(userId)
      ? ""
      : "영문, 숫자를 포함한 6자 이상의 비밀번호를 입력해주세요.";
  } else if (placeholder === "비밀번호 확인") {
    errorMessage =
      password === passwordCheck ? "" : "비밀번호가 일치하지 않습니다.";
  } else if (placeholder === "닉네임") {
    errorMessage = validateNickname(userId)
      ? ""
      : "한글, 영문, 숫자만 포함한 2~15자의 닉네임을 입력해주세요.";
  } else if (placeholder === "이메일") {
    errorMessage = validateEmail(userId)
      ? ""
      : "올바른 이메일 형식을 입력해주세요.";
  }

  return (
    <Container>
      <InputContainer>
        <FormInput
          type={type}
          placeholder={placeholder}
          value={userId}
          onChange={handleChange}
        />
        {placeholder === "아이디" && (
          <CheckButton onClick={handleCheck}>중복 확인</CheckButton>
        )}
      </InputContainer>
      {<ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default SignUpInputField;
