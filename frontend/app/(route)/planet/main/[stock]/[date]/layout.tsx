// /planet/layout.tsx
"use client"; // 클라이언트 컴포넌트로 지정

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const PlanetLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  // planet 경로에서만 애니메이션 적용
  if (!pathname.startsWith('/planet')) {
    return <>{children}</>; // planet 경로가 아니면 애니메이션 적용 안 함
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // 경로가 바뀔 때마다 애니메이션 적용
        initial={{ opacity: 0, y: -100 }} // 초기 상태
        animate={{ opacity: 1, y: 0 }}  // 페이지 활성화 후 상태
        exit={{ opacity: 0, y: 100 }}  // 페이지 떠날 때 상태
        transition={{ duration: 0.5 }}  // 애니메이션 지속 시간
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PlanetLayout;
