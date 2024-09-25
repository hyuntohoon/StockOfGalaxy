"use client";

import styled from "@emotion/styled";

// Prop 타입 정의
interface ImageProps {
  imgWidth?: number;
}

// Emotion을 사용하여 스타일링
const StyledImage = styled.img<ImageProps>`
  width: ${({ imgWidth }) => (imgWidth ? `${imgWidth}px` : "200px")};
  height: auto;
  margin: 10px 0px 40px 0px;
`;

// 컴포넌트 정의
interface LoginImageProps {
  imgWidth?: number;
}

const LoginImage: React.FC<LoginImageProps> = ({ imgWidth }) => {
  return <StyledImage src="/cat.png" alt="cat" imgWidth={imgWidth} />;
};

export default LoginImage;
