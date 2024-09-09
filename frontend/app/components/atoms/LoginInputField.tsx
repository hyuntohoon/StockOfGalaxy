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

const LoginInputField = ({ type, placeholder, setInputValue }) => {
  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [type === "password" ? type : "id"]: e.target.value,
    }));
  };
  return (
    <InputField type={type} placeholder={placeholder} onChange={handleChange} />
  );
};

export default LoginInputField;
