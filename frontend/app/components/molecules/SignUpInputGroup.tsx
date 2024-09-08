"use client";

import { useState } from "react";
import SignUpInputField from "../atoms/SignUpInputField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignUpInputGroup = () => {
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
        <SignUpInputField type="text" placeholder="아이디" />
        <SignUpInputField type="password" placeholder="비밀번호" />
        <SignUpInputField type="password" placeholder="비밀번호 확인" />
        <SignUpInputField type="text" placeholder="닉네임" />
        <SignUpInputField type="email" placeholder="이메일" />
      </Container>
    </>
  );
};

export default SignUpInputGroup;
