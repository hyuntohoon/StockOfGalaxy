'use client';

import styled from '@emotion/styled';
import StockTemplate from '../stock/StockTemplate';
import { useRef, useEffect } from 'react';

const TRANSITION_DURATION = '0.4s';

// 메뉴 스타일 정의
const MenuHeaderWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 20px;  /* 오른쪽에서 20px 떨어진 위치 */
  transform: translateX(${props => (props.isOpen ? '0' : '120%')});  /* 슬라이드 거리를 더 크게 설정 */
  width: 350px;  /* 메뉴가 더 넓게 나오도록 설정 */
  z-index: 10000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  transition: transform ${TRANSITION_DURATION} ease-in-out;
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;


interface StockHeaderProps {
  isOpen: boolean; // RootLayout에서 전달받는 isOpen prop
}

const StockHeader: React.FC<StockHeaderProps> = ({ isOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const stockTemplateRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    
    if (
      menuRef.current &&
      target instanceof Node &&  // target이 Node인지 체크
      !menuRef.current.contains(target) &&
      stockTemplateRef.current &&
      !stockTemplateRef.current.contains(target)
    ) {
      // 여기에 토글을 제어할 수 있는 로직을 추가하거나 필요에 따라 상태를 전달
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* 실제 메뉴 부분 */}
      <MenuHeaderWrapper
        ref={menuRef}
        isOpen={isOpen}
      >
        {/* StockTemplate도 마우스 이벤트로 제어 */}
        <div 
          ref={stockTemplateRef}
        >
          <StockTemplate />
        </div>
      </MenuHeaderWrapper>
    </>
  );
};

export default StockHeader;
