"use client";

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

const SignUpInputField = ({ type, placeholder, name, value, onChange }) => {
  return (
    <InputContainer>
      <InputField type={type} placeholder={placeholder} />
      {placeholder === "아이디" && (
        <CheckButton
          onClick={() => {
            alert("중복 확인");
          }}
        >
          중복 확인
        </CheckButton>
      )}
    </InputContainer>
  );
};

export default SignUpInputField;
