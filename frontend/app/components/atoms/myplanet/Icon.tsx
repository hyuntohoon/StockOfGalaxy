// components/atoms/myplanet/Icon.tsx
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface IconProps {
  src: string;
  size?: string;
}

const IconWrapper = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  overflow: hidden; // 이미지가 원형으로 보이도록 하기 위해 필요
  margin-right: 15px;
`;

export const Icon: React.FC<IconProps> = ({ src, size = '40px' }) => (
  <IconWrapper size={size}>
    <Image 
      src={src} 
      alt="Icon" 
      layout="responsive" // layout 설정 (fixed, responsive, fill, intrinsic)
      width={parseInt(size)} 
      height={parseInt(size)} 
    />
  </IconWrapper>
);
