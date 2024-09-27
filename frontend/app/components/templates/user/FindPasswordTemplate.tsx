"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "../../atoms/common/Title";
import FindPasswordInputGroup from "../../molecules/user/FindPasswordInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import styled from "@emotion/styled";

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
  `

const FindPasswordTemplate = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <LoginContainer>
        <Title text="find password" size={45} color="white" weight={700} />

        <FindPasswordInputGroup setIsAuthenticated={setIsAuthenticated} />
        <LoginButton
          value="다음"
          onClickProps={() => {
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
