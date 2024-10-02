"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockPrice from "../../molecules/stock/StockPrice";
import StockInfo from "../../molecules/stock/StockInfo";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import { getCurrentPrice } from "@/app/utils/apis/stock/getStockData";

const ParentContainer = styled.div`
  width: 50vw;
  overflow-y: auto;
  background-color: #111;
  color: white;
  width: 300px;
  max-height: 80%;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  align-items: center;
  border-radius: 20px;
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
  const stockData: stockData[] = [
    {
      stock_name: "삼성전자",
      stock_code: "005930",
    },
    {
      stock_name: "SK하이닉스",
      stock_code: "000660",
    },
    {
      stock_name: "LG에너지솔루션",
      stock_code: "051910",
    },
    {
      stock_name: "삼성바이오로직스",
      stock_code: "207940",
    },
    {
      stock_name: "현대차",
      stock_code: "005380",
    },
    {
      stock_name: "셀트리온",
      stock_code: "068270",
    },
    {
      stock_name: "삼성전자우",
      stock_code: "005935",
    },
    {
      stock_name: "기아",
      stock_code: "000270",
    },
    {
      stock_name: "KB금융",
      stock_code: "105560",
    },
    {
      stock_name: "POSCO홀딩스",
      stock_code: "005490",
    },
  ];

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: "삼성전자",
      stock_code: "005930",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "SK하이닉스",
      stock_code: "000660",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "LG에너지솔루션",
      stock_code: "051910",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "삼성바이오로직스",
      stock_code: "207940",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "현대차",
      stock_code: "005380",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "셀트리온",
      stock_code: "068270",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "삼성전자우",
      stock_code: "005935",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "기아",
      stock_code: "000270",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "KB금융",
      stock_code: "105560",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
    {
      stock_name: "POSCO홀딩스",
      stock_code: "005490",
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    },
  ]);

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

  return (
    <ParentContainer>
      <Header>
        <span>실시간 차트</span>
      </Header>
      {stockDataInfo.map((stock, index) => (
        <Container key={stock.stock_code}>
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
