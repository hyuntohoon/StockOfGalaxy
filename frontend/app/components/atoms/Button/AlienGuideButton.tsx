import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import alien from '@/public/images/alien/1.png';
import AlienGuideInfoBox from '../Text/AlienGuideInfoBox'; // InfoBox 컴포넌트


interface InfoBoxProps {
  info: string[];
}

const AlienGuideButton : React.FC<InfoBoxProps> = ({ info })=> {
  const [isHovered, setIsHovered] = useState(true); // 마우스 호버 상태 관리

  return (
    <div style={{ position: 'relative' }}>
      <StyledButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(true)}
      >
        <Icon>
          <Image src={alien} alt="플래닛 트랜드 가이드" width={35} />
        </Icon>
      </StyledButton>
      <InfoBox isVisible={isHovered}>
        <AlienGuideInfoBox info={info}/>
      </InfoBox>
    </div>
  );
};

const StyledButton = styled.div`
  position: fixed;
  display: flex;
  top: 27.5px;
  right: 110px;
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

const InfoBox = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100px; /* 버튼 아래에 표시되도록 위치 조정 */
  right: 110px;
  width: 290px;
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
