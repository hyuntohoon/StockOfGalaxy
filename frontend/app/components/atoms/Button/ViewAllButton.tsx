import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import eye from '@/public/images/eye.png';

const ViewAllButton = ({ onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) {
      onMouseEnter(); // 상위 컴포넌트의 onMouseEnter 콜백 호출
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onMouseLeave) {
      onMouseLeave(); // 상위 컴포넌트의 onMouseLeave 콜백 호출
    }
  };

  return (
    <StyledButton
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon>
        <Image src={eye} alt="플래닛 트랜드 전체보기" width={28} />
      </Icon>
    {isHovered && (
      <InfoBox>
        인기주식을 한 눈에! 👀
      </InfoBox>
    )}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  position: fixed;
  display: flex;
  top: 30px;
  right: 120px;
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
  display: flex;
  position: absolute;
  top: 60px; /* 버튼 아래에 표시되도록 위치 조정 */
  right: 0px;
  width: 160px;
  height: 40px;
  background-color: #000000c4;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 0px 12px rgba(75, 75, 75, 0.217);
  color: #e6e6e6;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
export default ViewAllButton;
