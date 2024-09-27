"use client";

import { useState } from "react";
import LoginInputGroup from "../../molecules/user/LoginInputGroup";
import LoginButtonGroup from "../../molecules/user/LoginButtonGroup";
import { FormContainer, LinkContainer, StyledLink } from "@/app/styles/user";

import Title from "../../atoms/common/Title";
import { ibm } from '@/public/fonts'


const LoginTemplate = () => {
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  return (
    <FormContainer className={ibm.className}>
      <Title text="login" size={45} color="white" weight={700} />
      <LoginInputGroup setInputValue={setInputValue} />
      <LinkContainer>
        <StyledLink href="/find-password">비밀번호 찾기</StyledLink>
      </LinkContainer>
      <LoginButtonGroup inputValue={inputValue} />
    </FormContainer>
  );
};

export default LoginTemplate;
