"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpInputGroup from "../../molecules/user/SignUpInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "styled-components";
import { signUpApi, signUpValidation } from "@/app/utils/apis/users/signup";
import Title from "../../atoms/common/Title";
import { FormContainer } from "@/app/styles/user";

const SignUpTemplate = () => {
  const router = useRouter();
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
          onClickProps={async () => {
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

            const response = await signUpApi({
              userId,
              password,
              nickname,
              email,
            });

            if (response === true) {
              router.push("/"); // 회원가입 성공 시 메인으로 이동
            }
          }}
        />
      </FormContainer>
    </>
  );
};

export default SignUpTemplate;
