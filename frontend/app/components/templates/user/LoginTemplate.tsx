"use client";

import { useState } from "react";
import LoginImage from "../../atoms/user/LoginImage";
import LoginInputGroup from "../../molecules/user/LoginInputGroup";
import LoginButtonGroup from "../../molecules/user/LoginButtonGroup";
import styled from "styled-components";
import Link from "next/link";

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
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 20px;
`;

const LinkContainer = styled.div`
  align-self: flex-end;
  margin: 10px 20px;
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: #777777;
  text-decoration: none;
  font-size: 1.1rem;
`;

const LoginTemplate = () => {
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  return (
    <>
      <LoginContainer>
        <LoginImage width={200} />
        <LoginInputGroup setInputValue={setInputValue} />
        <LinkContainer>
          <StyledLink href="/find-password">비밀번호 찾기</StyledLink>
        </LinkContainer>
        <LoginButtonGroup inputValue={inputValue} />
      </LoginContainer>
    </>
  );
};

export default LoginTemplate;
