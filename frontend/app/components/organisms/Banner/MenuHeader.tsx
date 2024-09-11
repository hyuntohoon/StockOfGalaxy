'use client'

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import HomeButtonGroup from '../../molecules/ButtonGroup/Header/HomeButtonGroup';
import ReturnTodayButtonGroup from '../../molecules/ButtonGroup/Header/ReturnTodayButtonGroup';
import SearchIconButtonGroup from '../../molecules/ButtonGroup/Header/SearchIconButtonGroup';
import MyIconButtonGroup from '../../molecules/ButtonGroup/Header/MyIconButtonGroup';
import SignInButtonGroup from '../../molecules/ButtonGroup/Header/SignInButtonGroup';
import MenuHeaderModal from '../Modal/MenuHeaderModal';

const MenuHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true); // 마우스가 호버되면 메뉴 오픈
  };

  const handleMouseLeave = () => {
    // 호버 후에는 메뉴가 계속 열려있게 하므로 아무것도 하지 않음
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
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ToggleButton onClick={toggleLogin}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </ToggleButton>

      {isMenuOpen && (
        <MenuHeaderWrapper ref={menuRef}>
          <ReturnTodayButtonGroup />
          <HomeButtonGroup />
          <SearchIconButtonGroup />
          {isLoggedIn ? <MyIconButtonGroup onClick={toggleModal} /> : <SignInButtonGroup />}
        </MenuHeaderWrapper>
      )}

      {isModalOpen && <MenuHeaderModal onClose={toggleModal} />}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 150px; /* 호버 영역 크기 */
  z-index: 1000;
`;

const MenuHeaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 20px;
  padding-inline: 10px;
  background-color: #ffffff6a;
  border-radius: 30px;
  justify-content: space-around;
  width: 100px;

  & > div {
    margin-bottom: 16px;
  }

  & > div:last-of-type {
    margin-bottom: 0;
  }
`;

const ToggleButton = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default MenuHeader;
