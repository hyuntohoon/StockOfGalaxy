"use client";

interface SignUpInputFieldProps {
  type: string;
  placeholder: string;
  setInfo: (value: string) => void;
  setIsAuthenticated?: (value: boolean) => void;
}

import { useState } from "react";
import { userIdValidate } from "@/app/utils/apis/users/signup";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const InputField = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 450px;
  height: 40px;
  margin: 15px 10px;
  font-size: 1.1rem;
`;

const CheckButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background-color: #0e224d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SignUpInputField: React.FC<SignUpInputFieldProps> = ({
  type,
  placeholder,
  setInfo,
  setIsAuthenticated,
}) => {
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
    setInfo(e.target.value);
  };

  return (
    <InputContainer>
      <InputField
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {placeholder === "아이디" && (
        <CheckButton
          onClick={async () => {
            const res = await userIdValidate(userId);
            if (res === true && setIsAuthenticated) {
              setIsAuthenticated(true);
            }
          }}
        >
          중복 확인
        </CheckButton>
      )}
    </InputContainer>
  );
};

export default SignUpInputField;
