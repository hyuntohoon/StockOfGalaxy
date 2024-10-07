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
      {isHovered && (
        <InfoBox>
          <AlienGuideInfoBox info={info}/>
        </InfoBox>
      )}
    </div>
  );
};

const StyledButton = styled.div`
  position: fixed;
  display: flex;
  top: 27.5px;
  right: 100px;
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.809);
  border-radius: 50px;
  box-shadow: 0px 0px 15px rgba(247, 255, 210, 0.5);
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  position: absolute;
  top: 94px; /* 버튼 아래에 표시되도록 위치 조정 */
  right: 50px;
  width: 290px;
  background-color: #000000c4;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 12px rgba(75, 75, 75, 0.217);
`;

export default AlienGuideButton;
