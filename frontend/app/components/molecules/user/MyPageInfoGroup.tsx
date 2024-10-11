"use client";

import { useEffect } from "react";
import { useAccessToken } from "@/app/store/userSlice";
import { getInfo } from "@/app/utils/apis/users";
import MyPageInfo from "../../atoms/user/MyPageInfo";
import styled from "@emotion/styled";
import { useUser } from '@/app/store/userSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border: 3px solid white;
  // border-radius: 25px;
  padding: 20px 60px;
  margin: 20px;
  width: 90%;
`;

const MyPageInfoGroup = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  const user = useUser().user;
  const userId = user.userId;
  const nickname = user.nickname;
  const email = user.email;
  useEffect(() => {
    const res = getInfo(accessToken, setAccessToken);
  }, []);

  return (
    <Container>
      <MyPageInfo type="아이디" content={userId} />
      <MyPageInfo type="닉네임" content={nickname} />
      <MyPageInfo type="이메일" content={email} />
    </Container>
  );
};

export default MyPageInfoGroup;
