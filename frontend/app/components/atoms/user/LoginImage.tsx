"use client";

import styled from "styled-components";

const Image = styled.img`
  width: ${({ width }) => (width ? `${width}px` : "200px")};
  height: auto;
  margin: 10px 0px 40px 0px;
`;

const LoginImage = ({ width }) => {
  return <Image src="/cat.png" alt="cat" width={width} />;
};

export default LoginImage;
