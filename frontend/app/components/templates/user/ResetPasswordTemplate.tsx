"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginImage from "../../atoms/user/LoginImage";
import ResetPasswordInputGroup from "../../molecules/user/ResetPasswordInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "styled-components";

import { resetPassword } from "@/app/utils/apis/users/password";

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

const FindPasswordTemplate = () => {
  const router = useRouter();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <>
      <LoginContainer>
        <LoginImage width={100} />
        <ResetPasswordInputGroup
          setPassword1={setPassword1}
          setPassword2={setPassword2}
        />
        <LoginButton
          value="비밀번호 변경"
          onClickProps={async () => {
            const res = await resetPassword(password1, password2);

            if (res === true) {
              alert("비밀번호가 변경되었습니다.");
              router.push("/login");
            }
          }}
        />
      </LoginContainer>
    </>
  );
};

export default FindPasswordTemplate;
