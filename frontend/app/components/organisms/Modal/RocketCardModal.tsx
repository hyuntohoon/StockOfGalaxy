import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Vector3, PerspectiveCamera } from 'three';
import ProfileImage from '../../atoms/ProfileImage';
import RocketContent from '../../atoms/Text/RocketContent';
import RocketTimeStamp from '../../atoms/Text/RocketTimeStamp';
import RocketPriceGroup from '../../molecules/ButtonGroup/RocketPriceGroup';
import { RocketData } from '@/app/types/rocket';
import { calculatePriceChange } from '@/app/utils/libs/stock/calculatePriceChange';

interface RocketCardModalProps {
  onClose: () => void;
  position: Vector3;  // 3D 좌표
  camera: PerspectiveCamera;  // 3D 좌표를 변환하기 위한 카메라
  rendererDomElement: HTMLCanvasElement; // 렌더러의 DOM 요소
  data: RocketData;
  currentPrice: string;
}

const RocketCardModal: React.FC<RocketCardModalProps> = ({
  onClose,
  position,
  camera,
  rendererDomElement,
  data,
  currentPrice
}) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 }); // 초기 위치를 화면 밖으로 설정
  const { priceChange, priceChangeSign } = calculatePriceChange(data.price, Number(currentPrice));

  useEffect(() => {
    // 3D 좌표를 2D 화면 좌표로 변환하는 함수
    const vector = position.clone();  // 3D position 복제
    vector.project(camera); // 카메라를 기준으로 3D 좌표를 2D로 변환

    // 변환된 2D 좌표를 화면 좌표로 변환
    const x = (vector.x * 0.5 + 0.5) * rendererDomElement.clientWidth + 30;
    const y = (-vector.y * 0.5 + 0.5) * rendererDomElement.clientHeight;

    // 변환된 좌표를 상태로 저장
    setScreenPosition({ x, y });
  }, [position, camera, rendererDomElement]);

  return screenPosition.x !== -9999 && screenPosition.y !== -9999 ? (
    <ModalContainer
      style={{ top: `${screenPosition.y}px`, left: `${screenPosition.x}px` }}
    >
      <RocketContainer>
        <UserInfoWrapper>
          <ProfileImage characterType={data.characterType} alt={`${data.nickname}의 프로필 이미지`} />
          <Nickname>{data.nickname}</Nickname>
        </UserInfoWrapper>
        <ContentContainer>
          <RocketPriceGroup
            stockPrice={data.price}
            priceChange={priceChange}
            priceChangeSign={priceChangeSign}
          />
          <RocketContent message={data.message} fontWeight={600} />
          <TimeSection>
            <RocketTimeStamp createdAt={data.createdAt} fontSize={11} />
          </TimeSection>
        </ContentContainer>
      </RocketContainer>
    </ModalContainer>
  ): null;
};

const ModalContainer = styled.div`
  position: absolute;
  padding: 10px;
  width: 360px;
  min-height: 90px;
  background: #ece9f0f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  display: flex;
  z-index: 2000;
  flex-direction: column;
`;

const RocketContainer = styled.div`
  display: flex;
  width: 100%;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  flex: none;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 10px;
  margin-inline: 10px;
  margin-block: 5px;
`;

const TimeSection = styled.div`
  align-self: flex-end; // 컨테이너 끝에 정렬
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export default RocketCardModal;
