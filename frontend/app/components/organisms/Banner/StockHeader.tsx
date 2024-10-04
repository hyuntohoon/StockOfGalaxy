'use client';

import styled from '@emotion/styled';
import StockTemplate from '../stock/StockTemplate';
import { useState, useRef, useEffect } from 'react';

const TRANSITION_DURATION = '0.4s';

// 호버 감지 영역
const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 50px; /* 호버 감지 영역의 너비 */
  z-index: 10000000;
  background-color: transparent; /* 호버 감지 영역은 투명 */
`;

const MenuHeaderWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 5%;  /* 상단에서 5% 떨어진 위치 */
  right: 0;
  height: 90%;  /* 전체 높이의 90%를 차지 */
  z-index: 10000000;

  transform: translate(100%, -50%) translateX(${props => (props.isOpen ? '-101%' : '0')}) translateY(55%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px;

  justify-content: center;
  width: 300px;
  transition: transform ${TRANSITION_DURATION} ease-in-out;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  /* 포인터 이벤트 관리 */
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;


const StockHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const stockTemplateRef = useRef<HTMLDivElement>(null);

  // 메뉴 열기
  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  // 메뉴 닫기
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const relatedTarget = event.relatedTarget as Node | null;

    // relatedTarget이 존재하고 Node인지 확인
    if (
      menuRef.current &&
      (relatedTarget instanceof Node) &&  // relatedTarget이 Node인지 체크
      !menuRef.current.contains(relatedTarget) &&
      stockTemplateRef.current &&
      !stockTemplateRef.current.contains(relatedTarget)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    
    if (
      menuRef.current &&
      target instanceof Node &&  // target이 Node인지 체크
      !menuRef.current.contains(target) &&
      stockTemplateRef.current &&
      !stockTemplateRef.current.contains(target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 메뉴가 열리도록 호버 감지 영역 */}
      <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      
      {/* 실제 메뉴 부분 */}
      <MenuHeaderWrapper
        ref={menuRef} 
        isOpen={isMenuOpen}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter} // StockTemplate에 마우스가 있을 때도 열려있도록
      >
        {/* StockTemplate도 마우스 이벤트로 제어 */}
        <div 
          ref={stockTemplateRef}
          onMouseEnter={handleMouseEnter} // StockTemplate 위에 마우스가 있으면 열려있게
          onMouseLeave={handleMouseLeave} // StockTemplate에서 마우스가 벗어나면 닫힘
        >
          <StockTemplate />
        </div>
      </MenuHeaderWrapper>
    </>
  );
};

export default StockHeader;
