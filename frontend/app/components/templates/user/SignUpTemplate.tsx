"use client";

import { useState } from "react";
import LoginImage from "../../atoms/user/LoginImage";
import SignUpInputGroup from "../../molecules/user/SignUpInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "styled-components";
import { signUp } from "../../../utils/user/userAPI";
import { signUpValidation } from "../../../utils/user/signUpAPI";

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
          onClickProps={() => {
            const res = signUpValidation(
              isAuthenticated,
              userId,
              password,
              passwordCheck,
              nickname,
              email
            );

            if (res === false) {
              return;
            }

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
