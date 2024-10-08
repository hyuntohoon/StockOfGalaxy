import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import alien from '@/public/images/alien/1.png';
import AlienGuideInfoBox from '../Text/AlienGuideInfoBox'; // InfoBox 컴포넌트


interface InfoBoxProps {
  info: string[];
}

const AlienGuideButton : React.FC<InfoBoxProps> = ({ info })=> {
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리

  return (
    <div style={{ position: 'relative' }}>
      <StyledButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

const Icon = styled.div`
  display: flex;
`;

const InfoBox = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100px; /* 버튼 아래에 표시되도록 위치 조정 */
  right: 110px;
  width: 290px;
  background-color: #000000c4;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 12px rgba(75, 75, 75, 0.217);

  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export default AlienGuideButton;
