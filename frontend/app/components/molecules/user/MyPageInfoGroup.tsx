"use client";

import { useEffect } from "react";
import {useAccessToken} from "@/app/utils/libs/user/useAccessToken";
import { getInfo } from "@/app/utils/apis/users";
import MyPageInfo from "../../atoms/user/MyPageInfo";
import styled from "@emotion/styled";

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

  useEffect(() => {
    const res = getInfo(accessToken, setAccessToken);
  }, []);

  return (
    <Container>
      <MyPageInfo type="아이디" content="ssafy" />
      <MyPageInfo type="이름" content="싸피" />
      <MyPageInfo type="닉네임" content="싸피최고" />
      <MyPageInfo type="이메일" content="ssafy@email.com" />
    </Container>
  );
};

export default MyPageInfoGroup;
