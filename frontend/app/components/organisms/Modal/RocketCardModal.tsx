import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Vector3, PerspectiveCamera } from 'three';

interface RocketCardModalProps {
  onClose: () => void;
  position: Vector3;  // 3D 좌표
  camera: PerspectiveCamera;  // 3D 좌표를 변환하기 위한 카메라
  rendererDomElement: HTMLCanvasElement; // 렌더러의 DOM 요소
}

const RocketCardModal: React.FC<RocketCardModalProps> = ({ onClose, position, camera, rendererDomElement }) => {
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });

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

  return (
    <ModalContainer style={{ top: `${screenPosition.y}px`, left: `${screenPosition.x}px` }}>
      <Content>
        <p>로켓 정보</p>
        <button onClick={onClose}>Close</button>
      </Content>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 2000;
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
`;

export default RocketCardModal;
