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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Container>
        <SignUpInputField
          type="text"
          placeholder="아이디"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <SignUpInputField
          type="password"
          placeholder="비밀번호"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <SignUpInputField
          type="password"
          placeholder="비밀번호 확인"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <SignUpInputField
          type="text"
          placeholder="닉네임"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <SignUpInputField
          type="email"
          placeholder="이메일"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>회원가입</button> {/* 폼 제출 버튼 */}
      </Container>
    </>
  );
};

export default SignUpInputGroup;
