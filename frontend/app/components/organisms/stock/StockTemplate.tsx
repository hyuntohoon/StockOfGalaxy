"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockPrice from "../../molecules/stock/StockPrice";
import StockInfo from "../../molecules/stock/StockInfo";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import { getCurrentPrice } from "@/app/utils/apis/stock/getStockData";
import { stock_list } from "@/app/utils/apis/stock/findStockName";
import { useRouter, useParams } from "next/navigation";

const ParentContainer = styled.div`
  width: 300px;
  height: 92%; /* 높이를 줄여서 StockHeader와 맞춤 */
  max-height: 95vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하게 설정 */
  background-color: #dbdbdbf9;
  border-radius: 26px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 20px rgba(115, 115, 115, 0.224);
  align-items: center;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const Container = styled.div`
  color: black;
  padding: 20px;
  margin: 8px 15px;
  background-color: #ffffff;
  width: 270px;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

interface stockData {
  stock_name: string;
  stock_code: string;
}

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const StockTemplate = () => {
  const router = useRouter();
  const { date } = useParams();
  const currentDate =
    date ?? new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const stockData: stockData[] = stock_list;

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>(
    stock_list.map((stock) => ({
      stock_name: stock.stock_name,
      stock_code: stock.stock_code,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    }))
  );

  useEffect(() => {
    stockDataInfo.map(async (stock, index) => {
      try {
        const res = await getCurrentPrice(stock.stock_code);

        setStockDataInfo((prevStockData: any[]) => {
          return prevStockData.map((stock) =>
            res && res.stockCode && stock.stock_code === res.stockCode
              ? {
                  stock_name: stock.stock_name,
                  stock_code: res.stockCode,
                  currentPrice: res.stckPrpr,
                  changePrice: res.prdyVrss,
                  changeRate: res.prdyCtrt,
                }
              : stock
          );
        });
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useKRStockWebSocket(stockData, setStockDataInfo);

  const moveDetailPage = (stock_code: string) => {
    router.push(`/planet/main/${stock_code}/${currentDate}`);
  };

  return (
    <ParentContainer>
      <Header>
        <span>실시간 차트</span>
      </Header>
      {stockDataInfo.map((stock, index) => (
        <Container
          key={stock.stock_code}
          onClick={() => moveDetailPage(stock.stock_code)}
        >
          <StockInfo
            index={index}
            stock_code={stock.stock_code}
            koreanName={stock.stock_name}
          />
          <StockPrice
            currentPrice={stock.currentPrice}
            changePrice={stock.changePrice}
            changeRate={stock.changeRate}
          />
        </Container>
      ))}
    </ParentContainer>
  );
};

export default StockTemplate;
