'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import StockHeader from '../../organisms/Banner/StockHeader';

// 서비스 테마에 맞춘 토글 스위치 스타일 정의
const ToggleSwitch = styled.label`
  z-index: 10010;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  margin: 10px;
  box-shadow: 0px 0px 15px rgba(247, 255, 210, 0.5);
  border-radius: 50px;

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
  const [isStockHeaderOpen, setIsStockHeaderOpen] = useState(false);

  const handleToggleChange = () => {
    setIsStockHeaderOpen(!isStockHeaderOpen);
  };

  return (
    <>
      {/* 토글 스위치 UI */}
      <div style={{ position: "fixed", top: "27.5px", right: "28px", zIndex: 100000 }}>
        <ToggleSwitch>
          <input type="checkbox" checked={isStockHeaderOpen} onChange={handleToggleChange} />
          <span />
        </ToggleSwitch>
      </div>

      {/* StockHeader 토글 상태에 따라 열림 */}
      <StockHeader isOpen={isStockHeaderOpen} />
    </>
  );
};

export default ChartToggleButton;
