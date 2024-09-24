"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "../../atoms/common/Title";
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
        {/* <LoginImage imgWidth={100} /> */}
        <div style={{fontSize:'30px', color: 'white',fontWeight:'900', marginBottom: '20px' }}>비밀번호 찾기</div>
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
