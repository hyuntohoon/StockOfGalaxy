// components/atoms/myplanet/Icon.tsx
import React from 'react';
import Image from 'next/image';
import {IconWrapper} from '@/app/styles/myplanet'

interface IconProps {
  src: string;
  size?: string;
  width: number;
}

export const Icon: React.FC<IconProps> = ({ src, size = '40px', width }) => (
  <IconWrapper size={size}>
    <Image 
      src={src} 
      alt="Icon" 
      width={width} 
      layout="responsive" // layout 설정 (fixed, responsive, fill, intrinsic)
      height={width}
    />
  </IconWrapper>
);
