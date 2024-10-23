import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import alien from '@/public/images/alien/1.png';
import AlienGuideInfoBox from '../Text/AlienGuideInfoBox'; // InfoBox 컴포넌트

interface InfoBoxProps {
  info: string[];
  top?: number;
  right?: number;
  left?: number;
  width?: number;
}

const AlienGuideButton: React.FC<InfoBoxProps> = ({ info, top = 34.5, right = 110, left, width=290}) => {
  const [isHovered, setIsHovered] = useState(true); // 마우스 호버 상태 관리

  return (
    <div style={{ position: 'relative' }}>
      <StyledButton
        top={top}
        right={right}
        left = {left}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(true)}
      >
        <Icon>
          <Image src={alien} alt="플래닛 트랜드 가이드" width={35} />
        </Icon>
      </StyledButton>
      <InfoBox isVisible={isHovered} top={top} right={right} left={left} width={width}>
        <AlienGuideInfoBox info={info} />
      </InfoBox>
    </div>
  );
};

// StyledButton에서 top과 right를 props로 받아 사용
const StyledButton = styled.div<{ top: number; right: number; left: number }>`
  position: fixed;
  display: flex;
  top: ${({ top }) => `${top}px`}; // props로 받은 top 값 적용
  right: ${({ right }) => `${right}px`}; // props로 받은 right 값 적용
  left: ${({ left }) => `${left}px`}; // props
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.809);
  border-radius: 50px;
  box-shadow: 0px 0px 15px rgba(247, 255, 210, 0.5);
  cursor: pointer;
  transition: transform 0.2s;

  /* 마우스 호버 시 확대 효과 */
  &:hover {
    transform: scale(1.1); /* 살짝 커지도록 설정 */
  }
`;

/* 아이콘이 종알종알 말하는 느낌을 위한 애니메이션 */
const Icon = styled.div`
  display: flex;
  animation: talk 1s infinite ease-in-out; /* 애니메이션 적용 */

  @keyframes talk {
    0%, 100% {
      transform: translateY(0); /* 원래 위치 */
    }
    25% {
      transform: translateY(-2px); /* 살짝 위로 */
    }
    50% {
      transform: translateY(2px); /* 살짝 아래로 */
    }
    75% {
      transform: translateY(-2px); /* 다시 살짝 위로 */
    }
  }
`;

const InfoBox = styled.div<{ isVisible: boolean; top: number; right: number; left: number; width: number }>`
  position: absolute;
  top: ${({ top, width }) => (width > 400 ? `${top-15}px` : `${top + 70}px`)}; /* width가 400 이상이면 top 그대로, 그렇지 않으면 top+70 */
  right: ${({ right }) => `${right}px`};
  left: ${({ left }) => `${left + 70}px`};
  width: ${({ width }) => `${width}px`};
  background-color: #000000c4;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 14px rgba(75, 75, 75, 0.217);

  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;


export default AlienGuideButton;
