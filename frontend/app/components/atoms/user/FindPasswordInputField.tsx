"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import {
  sendAuthenticationCode,
  checkAuthenticationCode,
} from "@/app/utils/apis/users/password";
import { FormInput, CheckButton } from "@/app/styles/user";
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FindPasswordInputField = ({ type, placeholder, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [authenticationCode, setAuthenticationCode] = useState("");

  const handleChange = (e) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else {
      setAuthenticationCode(e.target.value);
    }
  };

  return (
    <InputContainer>
      <FormInput
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {placeholder === "이메일" && (
        <CheckButton
          onClick={() => {
            sendAuthenticationCode(email);
          }}
        >
          인증번호 전송
        </CheckButton>
      )}
      {placeholder === "인증번호" && (
        <CheckButton
          onClick={async () => {
            const res = await checkAuthenticationCode(authenticationCode);

            if (res === true) {
              setIsAuthenticated(true);
            }
          }}
        >
          인증번호 확인
        </CheckButton>
      )}
    </InputContainer>
  );
};

export default FindPasswordInputField;
