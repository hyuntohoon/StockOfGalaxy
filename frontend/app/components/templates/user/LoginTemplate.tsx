"use client";

import { useState } from "react";
import LoginImage from "../../atoms/user/LoginImage";
import LoginInputGroup from "../../molecules/user/LoginInputGroup";
import LoginButtonGroup from "../../molecules/user/LoginButtonGroup";
import styled from "@emotion/styled"; // 변경된 부분
import Link from "next/link";
import Title from "../../atoms/common/Title";
import { ibm } from '@/public/fonts'


// Emotion을 사용하여 스타일링
const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 40px;
`;

const LinkContainer = styled.div`
  align-self: flex-end;
  margin: 10px 20px;
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginTemplate = () => {
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  return (
    <LoginContainer className={ibm.className}>
      {/* <LoginImage imgWidth={100} /> */}
      <Title text="login" size={45} color="white" weight={700} />
      {/* <div style={{fontSize:'35px', color: 'white',fontWeight:'900' }}>로그인</div> */}
      <LoginInputGroup setInputValue={setInputValue} />
      <LinkContainer>
        <StyledLink href="/find-password">비밀번호 찾기</StyledLink>
      </LinkContainer>
      <LoginButtonGroup inputValue={inputValue} />
    </LoginContainer>
  );
};

export default LoginTemplate;
