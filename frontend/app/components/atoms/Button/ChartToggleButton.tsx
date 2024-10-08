'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import StockHeader from '../../organisms/Banner/StockHeader';
import AlienGuideInfoBox from '../Text/AlienGuideInfoBox';

const ToggleSwitch = styled.label`
  z-index: 10010;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  margin: 10px;
  box-shadow: 0px 0px 15px rgba(247, 255, 210, 0.5);
  border-radius: 50px;
  transition: transform 0.2s;
  
  /* 마우스 호버 시 확대 효과 */
  &:hover {
    transform: scale(1.1); /* 살짝 커지도록 설정 */
  }

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #a0a0a0; /* 기본 회색 배경 */
    transition: background-color 0.4s;
    border-radius: 34px;
    box-shadow: 0 0 10px rgba(67, 67, 67, 0.662); /* 부드러운 그림자 추가 */
  }

  & span:before {
    position: absolute;
    content: "";
    height: 22px;  /* 핸들의 크기를 중간 사이즈로 설정 */
    width: 22px;
    left: 3px;     /* 핸들의 왼쪽 여백 */
    bottom: 3px;   /* 핸들의 아래쪽 여백 */
    background-color: #fff;
    transition: transform 0.4s, background-color 0.4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 부드러운 그림자 */
  }

  & input:checked + span {
    background: linear-gradient(45deg, #834cbe, #567fc6); /* 그라데이션 배경 */
  }

  & input:checked + span:before {
    transform: translateX(22px);  /* 스위치가 켜졌을 때 이동 범위를 조정 */
  }

  & input:checked + span:before {
    background-color: #fff;  /* 스위치 핸들의 색상 */
  }
`;

const ChartToggleButton: React.FC = () => {
  // 상태 관리
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리
  const [isStockHeaderOpen, setIsStockHeaderOpen] = useState(false);

  const info = [
    'CLICK!🖱️',
    '시가총액 기준 실시간 차트를 확인해보세요!'
  ];

  const handleToggleChange = () => {
    setIsStockHeaderOpen(!isStockHeaderOpen);
  };

  return (
    <>
     {/* 토글 스위치 UI */}
     <div style={{ position: "fixed", top: "27.5px", right: "28px", zIndex: 100000 }}>
        <ToggleSwitch
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input type="checkbox" checked={isStockHeaderOpen} onChange={handleToggleChange} />
          <span />
        </ToggleSwitch>
        {/* StockHeader가 열려있지 않을 때 InfoBox 표시 */}
        {!isStockHeaderOpen && (
          <InfoBox isVisible={isHovered}>
            <AlienGuideInfoBox info={info} />
          </InfoBox>
        )}
      </div>

      {/* StockHeader 토글 상태에 따라 열림 */}
      <StockHeader isOpen={isStockHeaderOpen} />
    </>
  );
};

const InfoBox = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 70px; /* 버튼 아래에 표시되도록 위치 조정 */
  right: 5px;
  width: 290px;
  background-color: #000000ea;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 12px rgba(75, 75, 75, 0.217);
  
  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export default ChartToggleButton;
