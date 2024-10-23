"use client";

import { FormInput } from "@/app/styles/user";
import React from "react";

// Props 타입 정의
interface LoginInputFieldProps {
  type: "text" | "password";
  placeholder: string;
  setInputValue: React.Dispatch<
    React.SetStateAction<{ id: string; password: string }>
  >;
}
const LoginInputField: React.FC<LoginInputFieldProps> = ({
  type,
  placeholder,
  setInputValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [type === "password" ? type : "id"]: e.target.value,
    }));
  };

  return (
    <FormInput
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      />
  );
};

export default LoginInputField;
