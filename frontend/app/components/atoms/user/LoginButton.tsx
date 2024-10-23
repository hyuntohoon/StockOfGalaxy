"use client";

import React from "react";
import { FormButton } from "@/app/styles/user";

interface LoginButtonProps {
  value: string;
  onClickProps: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ value, onClickProps }) => {
  return (
    <FormButton
      type="button"
      value={value}
      onClick={onClickProps}
    />
  );
};

export default LoginButton;
