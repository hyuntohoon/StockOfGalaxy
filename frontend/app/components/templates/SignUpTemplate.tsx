"use client";

import LoginImage from "../atoms/LoginImage";
import SignUpInputGroup from "../molecules/SignupInputGroup";
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

const SignUpTemplate = () => {
  return (
    <>
      <LoginContainer>
        <LoginImage width={100} />
        <SignUpInputGroup />
        <LoginButton value="회원가입" onClick={SignUp} />
      </LoginContainer>
    </>
  );
};

export default SignUpTemplate;
