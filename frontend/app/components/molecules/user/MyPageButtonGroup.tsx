"use client";

import { deleteAccount } from "@/app/utils/apis/users";
import MyPageButton from "../../atoms/user/MyPageButton";
import styled from "@emotion/styled";

const Container = styled.div`
 display: flex;
  gap: 40px; /* 버튼 간 간격 설정 */
  margin-top: 20px; /* 위쪽 여백 추가 */
`;


const MyPageButtonGroup = () => {
  return (
    <Container>
      <MyPageButton value="비밀번호 변경" deleteAccount={deleteAccount} />
      <MyPageButton value="회원탈퇴" />
    </Container>
  );
};

export default MyPageButtonGroup;
