"use client";

import LoginImage from "../../atoms/user/LoginImage";
import MyPageInfoGroup from "../../molecules/user/MyPageInfoGroup";
import MyPageButtonGroup from "../../molecules/user/MyPageButtonGroup";
import styled from "styled-components";

const MyPageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: auto;
  width: 65vw;
  min-width: 850px;
  border-radius: 10px;
  padding: 20px;
`;

const MyPageRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled.h2`
  color: white;
`;

const MyPageTemplate = () => {
  return (
    <>
      <MyPageContainer>
        <LoginImage width={200} />
        <MyPageRightContainer>
          <StyledHeading>마이 페이지</StyledHeading>
          <MyPageInfoGroup />
          <MyPageButtonGroup />
        </MyPageRightContainer>
      </MyPageContainer>
    </>
  );
};

export default MyPageTemplate;
