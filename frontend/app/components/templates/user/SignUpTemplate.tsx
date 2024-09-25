"use client";

import { useState } from "react";
import SignUpInputGroup from "../../molecules/user/SignUpInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import { signUpApi, signUpValidation } from "@/app/utils/apis/users/signup";
import Title from "../../atoms/common/Title";
import { FormContainer } from "@/app/styles/user";

const SignUpTemplate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <FormContainer>
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
      </FormContainer>
    </>
  );
};

export default SignUpTemplate;
