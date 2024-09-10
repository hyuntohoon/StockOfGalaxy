"use client";

import useAccessToken from "@/app/utils/useAccessToken";
import { useRouter } from "next/navigation";
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

const MyPageButton = ({ value, deleteAccount }) => {
  const router = useRouter();

  const { accessToken, setAccessToken } = useAccessToken();

  return (
    <StyledLoginButton
      type="button"
      value={value}
      onClick={() => {
        value === "비밀번호 변경"
          ? router.push("/reset-password")
          : deleteAccount(accessToken, setAccessToken);
      }}
    />
  );
};

export default MyPageButton;
