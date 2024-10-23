'use client'
import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import timeIcon from '@/public/images/planet/timeIcon.png';
import { useRouter } from 'next/navigation';
import AlienGuideInfoBox from "@/app/components/atoms/Text/AlienGuideInfoBox";

const TimeMachineButtonGroup = ({ bottom = '30px', right = '100px' }) => {
  const router = useRouter();

  const handleTimeMachineClick = () => {
    router.push("/timetravel");
  };
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리

  const info = [
    '타임머신을 타고','다른 날짜의 주식 정보를 여행할 수 있어요! ⏰'
  ];

  const infoBoxRight = `${parseInt(right, 10) + 10}px`; // ButtonGroup의 right 값 + 10

  return (
    <>
      <ButtonGroup 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        bottom={bottom}
        right={right}
        onClick={handleTimeMachineClick}
      >
        <Icon>
          <Image src={timeIcon} alt="타임머신" width={50} height={50} />
        </Icon>
        <Text>타임머신</Text>
      </ButtonGroup>
      <InfoBox isVisible={isHovered} right={infoBoxRight}>
        <AlienGuideInfoBox info={info} />
      </InfoBox>
    </>
  );
};

const ButtonGroup = styled.div<{ bottom: string; right: string }>`
  position: fixed;
  bottom: ${({ bottom }) => bottom}; // 동적으로 위치 설정
  right: ${({ right }) => right}; // 동적으로 위치 설정
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  z-index: 1000;
  cursor: pointer;

  transition: transform 0.3s;
  
  /* 마우스 호버 시 확대 효과 */
  &:hover {
    transform: scale(1.1); /* 살짝 커지도록 설정 */
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #fff;
  margin-top: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

const InfoBox = styled.div<{ isVisible: boolean; right: string }>`
  position: absolute;
  right: ${({ right }) => right}; // ButtonGroup의 right 값 + 10px
  bottom: 125px;
  width: 290px;
  background-color: #000000c4;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 14px rgba(116, 88, 128, 0.2);
  z-index: 1000;
  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export default TimeMachineButtonGroup;
