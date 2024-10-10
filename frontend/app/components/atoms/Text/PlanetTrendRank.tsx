import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PerspectiveCamera, Vector3 } from "three";

interface PlanetTrendRankProps {
  rank: number;
  position: Vector3; // 3D 좌표
  camera: PerspectiveCamera; // 3D 좌표 변환을 위한 카메라
  rendererDomElement: HTMLCanvasElement; // 렌더러의 DOM 요소
}

const PlanetTrendRank: React.FC<PlanetTrendRankProps> = ({ rank, position, camera, rendererDomElement }) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!position || !camera || !rendererDomElement) return;

    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const vector = position.clone();
    vector.project(camera); // 3D 좌표를 2D 화면 좌표로 변환

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight - 50; // 행성 위로 50px 정도 이동

    setScreenPosition({ x, y });
  }, [position, camera, rendererDomElement]);

  // rank가 1, 2, 3일 때만 아이콘을 표시
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  if (!getRankIcon(rank)) return null; // 1, 2, 3이 아닌 경우 아무것도 표시하지 않음

  return (
    <StyledRank
      style={{ top: `${screenPosition.y + 70}px`, left: `${screenPosition.x - 22}px` }}
    >
      {getRankIcon(rank)}
    </StyledRank>
  );
};

const StyledRank = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.8); /* 투명도를 0.8로 설정 */
  font-size: 26px;
  font-weight: bold;
  z-index: 2200;
  border-radius: 30px;
  /* background-color: black; */
  padding: 4px;
  opacity: 0.85;
  text-shadow: 0px 4px 10px rgba(218, 218, 218, 0.4);
`;

export default PlanetTrendRank;
