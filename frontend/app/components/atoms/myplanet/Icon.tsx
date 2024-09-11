// components/atoms/myplanet/Icon.tsx
import React from 'react';
import Image from 'next/image';
import {IconWrapper} from '@/app/styles/myplanet'

interface IconProps {
  src: string;
  size?: string;
}

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
