"use client";

import { useState } from "react";
import LoginImage from "../atoms/LoginImage";
import SignUpInputGroup from "../molecules/SignUpInputGroup";
import LoginButton from "../atoms/LoginButton";
import styled from "styled-components";
import { signUp } from "../../utils/userAPI";

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

const SignUpTemplate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <LoginContainer>
        <LoginImage width={100} />
        <SignUpInputGroup
          setUserId={setUserId}
          setPassword={setPassword}
          setPasswordCheck={setPasswordCheck}
          setNickname={setNickname}
          setEmail={setEmail}
          setIsAuthenticated={setIsAuthenticated}
        />
        <LoginButton
          value="회원가입"
          onClick={() => {
            if (isAuthenticated === false) {
              alert("아이디 중복 확인을 먼저 해주세요.");
              return;
            }

            if (password !== passwordCheck) {
              alert("비밀번호가 일치하지 않습니다.");
              return;
            }

            // regex
            signUp({
              userId,
              password,
              nickname,
              email,
            });
          }}
        />
      </LoginContainer>
    </>
  );
};

export default SignUpTemplate;
