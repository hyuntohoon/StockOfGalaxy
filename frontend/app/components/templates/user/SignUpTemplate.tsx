"use client";

import { useState } from "react";
import LoginImage from "../../atoms/user/LoginImage";
import SignUpInputGroup from "../../molecules/user/SignUpInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "styled-components";
import { signUpApi, signUpValidation } from "@/app/utils/apis/users/signup";
import Title from "../../atoms/common/Title";
const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(254, 254, 254, 0.2);
  border-radius: 20px;
  padding: 40px;
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
      <Title text="sign up" size={45} color="white" weight={700} />
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

            signUpApi({
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
