"use client";

import { useRouter } from "next/navigation";

import LoginImage from "../atoms/LoginImage";
import ResetPasswordInputGroup from "../molecules/ResetPasswordInputGroup";
import LoginButton from "../atoms/LoginButton";
import styled from "styled-components";
import SignUp from "../../utils/SignUp";

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

  return (
    <>
      <LoginContainer>
        <LoginImage width={100} />
        <ResetPasswordInputGroup />
        <LoginButton
          value="비밀번호 변경"
          onClick={() => {
            alert("비밀번호가 변경되었습니다.");
            router.push("/login");
          }}
        />
      </LoginContainer>
    </>
  );
};

export default FindPasswordTemplate;
