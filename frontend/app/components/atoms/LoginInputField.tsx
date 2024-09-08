"use client";

import styled from "styled-components";

const InputField = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 450px;
  height: 45px;
  margin: 15px 10px;
  font-size: 1.1rem;
`;

const LoginInputField = ({ type, placeholder }) => {
  return <InputField type={type} placeholder={placeholder} />;
};

export default LoginInputField;
