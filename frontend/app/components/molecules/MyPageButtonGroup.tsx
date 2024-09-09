"use client";

import { deleteAccount } from "@/app/utils/myPageAPI";

import MyPageButton from "../atoms/MyPageButton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MyPageButtonGroup = () => {
  return (
    <Container>
      <MyPageButton value="비밀번호 변경" deleteAccount={deleteAccount} />
      <MyPageButton value="회원탈퇴" deleteAccount={deleteAccount} />
    </Container>
  );
};

export default MyPageButtonGroup;
