"use client";

import useAccessToken from "@/app/utils/libs/user/useAccessToken";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const StyledLoginButton = styled.input`
  color: #9b9b9b;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  width: 200px;
  height: 50px;
  margin: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: white;
  color: #0e224d;
  cursor: pointer;
  border: 1px solid #0e224d;
`;

interface MyPageButtonProps {
  value: string;
  deleteAccount?: (
    accessToken: string,
    setAccessToken: (value: string) => void
  ) => Promise<boolean>;
}

const MyPageButton: React.FC<MyPageButtonProps> = ({
  value,
  deleteAccount,
}) => {
  const router = useRouter();

  const { accessToken, setAccessToken } = useAccessToken();

  const handleDelete = async () => {
    if (deleteAccount === undefined) {
      return;
    }

    const res = await deleteAccount(accessToken, setAccessToken);

    if (res === true) {
      router.push("/login");
    }
  };

  return (
    <StyledLoginButton
      type="button"
      value={value}
      onClick={() => {
        value === "비밀번호 변경"
          ? router.push("/reset-password")
          : handleDelete();
      }}
    />
  );
};

export default MyPageButton;
