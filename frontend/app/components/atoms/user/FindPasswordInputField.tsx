"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import {
  sendAuthenticationCode,
  checkAuthenticationCode,
} from "@/app/utils/apis/users/password";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const InputField = styled.input`
 color: #9b9b9b;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  width: 450px;
  height: 45px;
  margin: 15px 10px;
  font-size: 1rem;
  background-color: rgba(254, 254, 254, 0.2);

  &:focus {
    box-shadow: 0 0 10px rgba(81, 203, 238, 0.5);
  }

  ::placeholder {
    color: white;
  }
`;

const CheckButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 10px 12px;
  border: none;
  border-radius: 20px;
  background-color: #0e224d;
  color: white;
  font-size: 1rem;
  cursor: pointer;
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
      <InputField
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
