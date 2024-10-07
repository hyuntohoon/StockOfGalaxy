"use client";

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import HomeButtonGroup from '../../molecules/ButtonGroup/Header/HomeButtonGroup';
import ReturnTodayButtonGroup from '../../molecules/ButtonGroup/Header/ReturnTodayButtonGroup';
import SearchIconButtonGroup from '../../molecules/ButtonGroup/Header/SearchIconButtonGroup';
import MyIconButtonGroup from '../../molecules/ButtonGroup/Header/MyIconButtonGroup';
import SignInButtonGroup from '../../molecules/ButtonGroup/Header/SignInButtonGroup';
import MenuHeaderModal from '../Modal/MenuHeaderModal';
import { useIsLoggedIn } from '@/app/store/userSlice';

// 슬라이딩 애니메이션을 위한 트랜지션 시간
const TRANSITION_DURATION = '0.3s';

// 메뉴를 감싸는 컨테이너
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 80%;
  width: 30px; /* 호버 감지 영역의 너비 */
  z-index: 10000;
  background-color: transparent; /* 호버 감지 영역은 투명 */
`;

// 실제 메뉴 헤더
const MenuHeaderWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translate(-85%, -50%) translateX(${props => (props.isOpen ? '85%' : '0')});
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 20px 5px;
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 30px;
  justify-content: center;
  width: 120px;
  transition: transform ${TRANSITION_DURATION} ease-in-out;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  & > div {
    margin-bottom: 16px;
  }

  /* 포인터 이벤트 관리 */
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;

const MenuHeader: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const myIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsModalOpen(false);
    }
  }, [isMenuOpen]);

  const toggleModal = () => {
    if (myIconRef.current) {
      const rect = myIconRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.top, left: rect.right - 15 });
    }
    setIsModalOpen(prev => !prev);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.relatedTarget as Node | null;

    // 메뉴와 모달 영역을 확인하여 마우스가 두 영역 모두를 벗어났을 때만 메뉴와 모달을 닫음
    if (
      (!menuRef.current || (target && !menuRef.current.contains(target))) &&
      (!modalRef.current || (target && !modalRef.current.contains(target)))
    ) {
      setIsMenuOpen(false);
      setIsModalOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target as Node) &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
      setIsModalOpen(false);
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
      <Container onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={handleMouseLeave}>
        <MenuHeaderWrapper 
          isOpen={isMenuOpen}
          ref={menuRef}
        >
          <ReturnTodayButtonGroup />
          <HomeButtonGroup />
          <SearchIconButtonGroup />
          {isLoggedIn ? (
            <div ref={myIconRef} style={{ marginBottom: 0 }}>
              <MyIconButtonGroup onClick={toggleModal} />
            </div>
          ) : (
            <SignInButtonGroup />
          )}
        </MenuHeaderWrapper>
      </Container>

      {isModalOpen && (
        <MenuHeaderModal ref={modalRef}
          position={modalPosition} 
          onMouseEnter={() => setIsMenuOpen(true)}  // 모달에 마우스가 올라가면 메뉴를 열어둠
          onMouseLeave={handleMouseLeave} // 모달에서 마우스가 벗어나면 닫음
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default MenuHeader;
