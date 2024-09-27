'use client';

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import HomeButtonGroup from '../../molecules/ButtonGroup/Header/HomeButtonGroup';
import ReturnTodayButtonGroup from '../../molecules/ButtonGroup/Header/ReturnTodayButtonGroup';
import SearchIconButtonGroup from '../../molecules/ButtonGroup/Header/SearchIconButtonGroup';
import MyIconButtonGroup from '../../molecules/ButtonGroup/Header/MyIconButtonGroup';
import SignInButtonGroup from '../../molecules/ButtonGroup/Header/SignInButtonGroup';
import MenuHeaderModal from '../Modal/MenuHeaderModal';

// 슬라이딩 애니메이션을 위한 트랜지션 시간
const TRANSITION_DURATION = '0.3s';

// 메뉴를 감싸는 컨테이너
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 80%;
  width: 30px; /* 호버 감지 영역의 너비 */
  z-index: 1000000;
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
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 30px;
  justify-content: space-around;
  width: 120px;
  transition: transform ${TRANSITION_DURATION} ease-in-out;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  & > div {
    margin-bottom: 16px;
  }

  /* 포인터 이벤트 관리 */
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;

const ToggleButton = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const MenuHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true); // 마우스가 호버되면 메뉴 오픈
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false); // 마우스가 벗어나면 메뉴 닫힘
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false); // 다른 곳을 클릭하면 메뉴 닫힘
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
      <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <MenuHeaderWrapper 
          isOpen={isMenuOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={menuRef}
        >
          

          <ReturnTodayButtonGroup />
          <HomeButtonGroup />
          <SearchIconButtonGroup />
          {isLoggedIn ? <MyIconButtonGroup onClick={toggleModal} /> : <SignInButtonGroup />}
        </MenuHeaderWrapper>
      </Container>

      {isModalOpen && <MenuHeaderModal onClose={toggleModal} />}
    </>
  );
};

export default MenuHeader;
