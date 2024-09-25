"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockPrice from "../../molecules/stock/StockPrice";
import StockInfo from "../../molecules/stock/StockInfo";

const ParentContainer = styled.div`
  width: 50vw;
  height: 50vh;
  overflow-y: auto;
  background-color: #111;
  color: white;
  width: 300px;
  height: 80%;
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
  justify-content: space-between;
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
`;

interface CoinData {
  stock_name: string;
  stock_code: string;
}

interface CoinState {
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const StockTemplate = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([
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
  ]);

  return (
    <ParentContainer>
      <Header>
        <span>실시간 차트</span>
        <span>|</span>
        <span>뉴스</span>
      </Header>
      {coinData.map((coin, index) => (
        <Container key={coin.stock_code}>
          <StockInfo index={index} koreanName={coin.stock_name}></StockInfo>
          <StockPrice market={coin.stock_code}></StockPrice>
        </Container>
      ))}
    </ParentContainer>
  );
};

export default StockTemplate;
