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
import { getStockHistoryInfoApi } from "@/app/utils/apis/stock";
import { getTodayDate } from '@/app/utils/libs/getTodayDate';
import { useDate } from "@/app/store/date";

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
  date,
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
  const {setDate} = useDate();
  
  const realDate = getTodayDate(); // 실제 오늘 날짜
  const isToday = (date === realDate);
  console.log(isToday, date, realDate)

  // 훅을 항상 호출하고 내부에서 조건에 따라 웹소켓 연결
  useKRStockWebSocket(isToday ? stockDataInfo : [], setStockDataInfo);

  useEffect(() => {
    if (!isToday) {
      // 과거 데이터 조회 API 호출
      const fetchStockHistoryData = async () => {
        try {
          const historicalData = await getStockHistoryInfoApi(stockCode, date);
          if (historicalData) {
            setStockDataInfo([{
              stock_name: corpName || null,
              stock_code: stockCode || null,
              currentPrice: historicalData.endPrice, // 과거 데이터의 종가 사용
              changePrice: historicalData.changePrice,
              changeRate: historicalData.changeRate,
            }]);
          }
        } catch (error) {
          console.error("과거 주식 데이터를 가져오는 중 오류 발생:", error);
        }
      };

      fetchStockHistoryData();
    }
  }, [isToday, stockCode, date]);

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
