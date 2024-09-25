"use client";

import { ChangeEvent } from "react";
import { FormInput } from "@/app/styles/user";
// 타입스크립트를 사용하는 경우, Props 인터페이스를 정의합니다.
interface LoginInputFieldProps {
  type: string;
  placeholder: string;
  setPassword: (value: string) => void;
}



const LoginInputField: React.FC<LoginInputFieldProps> = ({
  type,
  placeholder,
  setPassword,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
