"use client";

import MyPageInfoGroup from "../../molecules/user/MyPageInfoGroup";
import MyPageButtonGroup from "../../molecules/user/MyPageButtonGroup";
import styled from "@emotion/styled";
import { FormContainer } from "@/app/styles/user";
import Title from "../../atoms/common/Title";

const MyPageRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const MyPageTemplate = () => {
  return (
    <>
      <FormContainer>
        <MyPageRightContainer>
        <Title text="my page" size={45} color="white" weight={700} />
        <MyPageInfoGroup />
          <MyPageButtonGroup />
        </MyPageRightContainer>
      </FormContainer>
    </>
  );
};

export default MyPageTemplate;
