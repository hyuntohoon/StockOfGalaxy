// components/ConditionalBackground.tsx
"use client";

import { usePathname } from 'next/navigation';
import SpaceBackGround from './SpaceBackground';

export default function ConditionalBackground() {
  const pathname = usePathname();

  // 특정 경로에서 SpaceBackGround를 제외
  const excludeBackgroundPaths = [
    "/planet/main", 
    "/main"
  ];

  // 제외할 경로와 일치하는지 확인
  const showBackground = !excludeBackgroundPaths.some(path => pathname.startsWith(path));

  return showBackground ? <SpaceBackGround /> : null;
}
