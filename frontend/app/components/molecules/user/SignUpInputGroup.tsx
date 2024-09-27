"use client";

import { useState } from "react";
import SignUpInputField from "../../atoms/user/SignUpInputField";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0px;
  margin-bottom: 20px;
`;

const SignUpInputGroup = ({
  setUserId,
  setPassword,
  setPasswordCheck,
  setNickname,
  setEmail,
  setIsAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    email: "",
  });

  return (
    <>
      <Container>
        <SignUpInputField
          type="text"
          placeholder="아이디"
          setInfo={setUserId}
          setIsAuthenticated={setIsAuthenticated}
        />
        <SignUpInputField
          type="password"
          placeholder="비밀번호"
          setInfo={setPassword}
          setIsAuthenticated={setIsAuthenticated}
        />
        <SignUpInputField
          type="password"
          placeholder="비밀번호 확인"
          setInfo={setPasswordCheck}
          setIsAuthenticated={setIsAuthenticated}
        />
        <SignUpInputField
          type="text"
          placeholder="닉네임"
          setInfo={setNickname}
          setIsAuthenticated={setIsAuthenticated}
        />
        <SignUpInputField
          type="email"
          placeholder="이메일"
          setInfo={setEmail}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Container>
    </>
  );
};

export default SignUpInputGroup;
