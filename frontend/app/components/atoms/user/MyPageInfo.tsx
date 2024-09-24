"use client";

import styled from "@emotion/styled";

const StyledHeading = styled.h2`
  color: white;
  justify-content: space-between;
  width: 100%;
`;

const MyPageInfo = ({ type, content }) => {
  return (
    <>
      <StyledHeading>
        {type} : {content}
      </StyledHeading>
    </>
  );
};

export default MyPageInfo;
