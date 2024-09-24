"use client";

import styled from "@emotion/styled";

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

const LoginInputField = ({ type, placeholder, setPassword }) => {
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <InputField type={type} placeholder={placeholder} onChange={handleChange} />
  );
};

export default LoginInputField;
