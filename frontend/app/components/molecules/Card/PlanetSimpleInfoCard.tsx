import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PlanetCardTitle from '../../atoms/Text/PlanetCardTitle';
import { Icon } from '../../atoms/myplanet/Icon';
import { useParams } from 'next/navigation';
import { getStockName } from '@/app/utils/apis/stock/planet';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import { getCurrentPrice } from '@/app/utils/apis/stock/getStockData';
import { getStockHistoryInfoApi } from '@/app/utils/apis/stock';
import { getTodayDate } from '@/app/utils/libs/getTodayDate';
import { useDate } from '@/app/store/date';

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: string | null;
  changePrice: string | null;
  changeRate: string | null;
}

const PlanetSimpleInfoCard = () => {
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const { date } = useDate();

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: null,
      stock_code: stockCode || null,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    }
  ]);

  const realDate = getTodayDate();
  const isToday = date === realDate;

  // 주식명 데이터를 가져오는 함수
  useEffect(() => {
    const fetchStockName = async () => {
      if (stockCode) {
        const name = await getStockName(stockCode);
        setStockDataInfo(prev => prev.map(stock => ({
          ...stock,
          stock_name: name
        })));
      }
    };
    fetchStockName();
  }, [stockCode]);

  // 실시간 주가 또는 과거 데이터를 가져오는 함수
  useEffect(() => {
    const fetchStockData = async () => {
      if (stockCode) {
        try {
          if (isToday) {
            // 현재 데이터 받아오기
            const currentPriceData = await getCurrentPrice(stockCode);
            if (currentPriceData) {
              setStockDataInfo(prev => prev.map(stock => ({
                ...stock,
                currentPrice: currentPriceData.stckPrpr,
                changePrice: currentPriceData.prdyVrss,
                changeRate: currentPriceData.prdyCtrt,
              })));
            }
          } else {
            // 과거 데이터 받아오기
            const historicalData = await getStockHistoryInfoApi(stockCode, date);
            if (historicalData) {
              setStockDataInfo(prev => prev.map(stock => ({
                ...stock,
                currentPrice: historicalData.close_price, // 과거 데이터의 종가 사용
                changePrice: historicalData.prdy_vrss,
                changeRate: historicalData.prdy_ctrt,
              })));
            }
          }
        } catch (error) {
          console.error('주가 데이터를 가져오는 중 오류 발생:', error);
        }
      }
    };
    fetchStockData();
  }, [stockCode, isToday, date]);

  // 웹소켓 데이터를 통해 실시간 업데이트 (오늘 날짜일 때만)
  useKRStockWebSocket(stockDataInfo, (newStockDataInfo) => {
    if (isToday) {
      setStockDataInfo(newStockDataInfo);
    }
  });

  if (!stockDataInfo[0]) return null;

  return (
    <CardContainer>
      <IconContainer>
        <Icon src={`/stock_logos/Stock${stockCode}.svg`} size="50px" width={20} />
      </IconContainer>
      <StockInfoContainer>
        <TitleRow>
          <PlanetCardTitle title={stockDataInfo[0].stock_name} />
          <StockCode>{stockDataInfo[0].stock_code}</StockCode>
        </TitleRow>
        <PriceRow>
          <CurrentPrice>{Number(stockDataInfo[0].currentPrice || 0).toLocaleString()}원</CurrentPrice>
          <PriceChange changePrice={Number(stockDataInfo[0].changePrice)}>
            {Number(stockDataInfo[0].changePrice || 0).toLocaleString()}원
          </PriceChange>
          <ChangeRate changePrice={Number(stockDataInfo[0].changePrice)}>
            ({stockDataInfo[0].changeRate}%)
          </ChangeRate>
        </PriceRow>
      </StockInfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 14px 20px;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  min-width: 260px;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 2px;
`;

const StockInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: end;
  font-size: 18px;
`;

const StockCode = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #ffffffca;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const CurrentPrice = styled.div`
  font-size: 16px;
  margin-right: 15px;
  letter-spacing: 0.6px;
  color: #ffffffed;
`;

const PriceChange = styled.div<{ changePrice: number | null }>`
  font-size: 14px;
  color: ${({ changePrice }) => (changePrice && changePrice > 0 ? '#f5bccb' : '#9ec0f6')};
`;

const ChangeRate = styled.div<{ changePrice: number | null }>`
  font-size: 14px;
  color: ${({ changePrice }) => (changePrice && changePrice > 0 ? '#f5bccb' : '#9ec0f6')};
  margin-left: 4px;
`;

export default PlanetSimpleInfoCard;
