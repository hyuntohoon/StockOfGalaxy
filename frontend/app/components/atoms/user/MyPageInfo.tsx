"use client";

import styled from "@emotion/styled";

interface MyPageInfoProps {
  type: string;
  content: string;
}

const StyledHeading = styled.h2`
  color: white;
  justify-content: space-between;
  width: 100%;
`;

const MyPageInfo = ({ type, content }: MyPageInfoProps) => {
  return (
    <StyledHeading>
      {type} : {content}
    </StyledHeading>
  );
};

export default MyPageInfo;
