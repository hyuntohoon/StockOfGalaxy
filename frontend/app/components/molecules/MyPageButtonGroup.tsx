"use client";

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
      <MyPageButton value="비밀번호 변경" />
      <MyPageButton value="회원탈퇴" />
    </Container>
  );
};

export default MyPageButtonGroup;
