"use client";

import { useRouter } from "next/navigation";

import LoginImage from "../atoms/LoginImage";
import FindPasswordInputGroup from "../molecules/FindPasswordInputGroup";
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
        <FindPasswordInputGroup />
        <LoginButton
          value="다음"
          onClick={() => {
            router.push("/reset-password");
          }}
        />
      </LoginContainer>
    </>
  );
};

export default FindPasswordTemplate;
