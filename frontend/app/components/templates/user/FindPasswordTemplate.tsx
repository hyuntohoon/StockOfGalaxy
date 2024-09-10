"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginImage from "../../atoms/user/LoginImage";
import FindPasswordInputGroup from "../../molecules/user/FindPasswordInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "styled-components";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <LoginContainer>
        <LoginImage width={100} />
        <FindPasswordInputGroup setIsAuthenticated={setIsAuthenticated} />
        <LoginButton
          value="다음"
          onClick={() => {
            if (isAuthenticated === true) {
              router.push("/reset-password");
            } else {
              alert("이메일 인증을 먼저 해주세요.");
            }
          }}
        />
      </LoginContainer>
    </>
  );
};

export default FindPasswordTemplate;
