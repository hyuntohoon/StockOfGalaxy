import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  LeftWrapper,
  CenterWrapper,
  Change,
  CompanyName,
  StockPrice,
} from "@/app/styles/planet-trend";
import StockIcon from "../../atoms/stock/StockIcon";
import {
  SelectedPlanetTrendData,
  PlanetTrendModalProps,
} from "@/app/types/main";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import { getDailyStockData } from "@/app/utils/apis/stock/getStockData";
import { useRecoilValue } from 'recoil';
import { getTodayDate } from '@/app/utils/libs/getTodayDate';
import { dateState } from '@/app/store/date';

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const PlanetTrendModal: React.FC<PlanetTrendModalProps> = ({
  stockCode,
  corpName,
  position,
  camera,
  rendererDomElement,
  onClose,
}) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 });
  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: corpName || null,
      stock_code: stockCode || null,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
  ]);

  const currentSetDate = useRecoilValue(dateState); // 현재 사용자가 설정한 날짜
  const realDate = getTodayDate(); // 실제 오늘 날짜
  const isToday = currentSetDate === realDate;

  // 웹소켓을 통해 실시간 데이터를 받아오는 훅 호출
  useKRStockWebSocket(stockDataInfo, setStockDataInfo);

  useEffect(() => {
    if (!position || !camera || !rendererDomElement) return;

    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

    setScreenPosition({ x: x, y: y });
  }, [position, camera, rendererDomElement]);

  if (!stockDataInfo[0]) return null;

  return (
    <ModalContainer
      style={{ top: `${screenPosition.y}px`, left: `${screenPosition.x}px` }}
    >
      <LeftWrapper>
        <StockIcon stock_code={stockDataInfo[0].stock_code} width={36} height={36} />
        <CompanyName>{stockDataInfo[0].stock_name}</CompanyName>
      </LeftWrapper>
      <CenterWrapper>
        <StockPrice>
          {Number(stockDataInfo[0].currentPrice || 0).toLocaleString()}원
        </StockPrice>
        <Change
          color={stockDataInfo[0].changePrice! > 0 ? "#F02C44" : "#2C6FF0"}
        >
          {parseInt(stockDataInfo[0].changePrice?.toString() || "0").toLocaleString()}원 (
          {stockDataInfo[0].changeRate}%)
        </Change>
      </CenterWrapper>
    </ModalContainer>
  );
};

export default PlanetTrendModal;
