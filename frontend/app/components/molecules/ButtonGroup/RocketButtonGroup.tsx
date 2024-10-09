"use client"
import {useState} from "react";
import AlienGuideInfoBox from "@/app/components/atoms/Text/AlienGuideInfoBox";
import styled from '@emotion/styled';
import Image from 'next/image';
import rocketIcon from '@/public/images/planet/rocketIcon.png'

const RocketButtonGroup = ({ onRocketClick }) => {

  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리

  const info = [
    '행성을 맴도는 로켓은',
    '과거의 유저들이 주식에 대한','의견을 날려보낸 것이랍니다! 🚀'
  ]

  return (
    <>
    <ButtonGroup 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      onClick={onRocketClick}
    >
      <Icon>
        <Image src={rocketIcon} alt="로켓" width={50} height={50} />
      </Icon>
      <Text>로켓</Text>
    </ButtonGroup>
    <InfoBox isVisible={isHovered}>
      <AlienGuideInfoBox info={info}/>
    </InfoBox>
    </>
  );
};

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 30px;
  right: 20px;
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

const InfoBox = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 30px;
  bottom: 125px;
  width: 290px;
  background-color: #000000c4;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 14px rgba(116, 88, 128, 0.2);
  
  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export default RocketButtonGroup;
