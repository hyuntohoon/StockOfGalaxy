import { PerspectiveCamera, Vector3 } from "three";


export interface HoveredPlanetData {
  stockCode: string;
  corpName: string;
  position: Vector3;
}


export interface PlanetTrendData {
  rank: number; // 순위
  stockCode: string; // 주식 코드
  corpName: string; // 주식명
}

export interface PlanetTrendModalProps {
  stockCode: string;
  corpName: string;
  position: Vector3; // 3D 좌표
  camera: PerspectiveCamera; // 3D 좌표 변환을 위한 카메라
  date: string;
  rendererDomElement: HTMLCanvasElement; // 렌더러의 DOM 요소
  onClose: () => void; // 모달을 닫는 함수
}

export interface PlanetTrendSimpleModalProps {
  stockCode: string;
  corpName: string;
  rank: number;
  position: Vector3; // 3D 좌표
  camera: PerspectiveCamera; // 3D 좌표 변환을 위한 카메라
  rendererDomElement: HTMLCanvasElement; // 렌더러의 DOM 요소
  onClose: () => void; // 모달을 닫는 함수
}

export interface SelectedPlanetTrendData {
  stockCode: string; // 주식 코드
  corpName: string; // 주식명
  stockPrpr: number; // 현재가
  prdyVrssSign: string; // 전일 대비 부호
  prdyVrss: string; // 전일 대비
  prdyCtrt: string; // 전일 대비율
  iconSrc: string;
}