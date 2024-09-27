"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockHeaderPrice from "../../molecules/stock/StockHeaderPrice";
import StockHeaderInfo from "../../molecules/stock/StockHeaderInfo";
import { HeaderWrapper } from "@/app/styles/planet";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";

const ParentContainer = styled.div`
  min-width: 950px;
  height: 50vh;
  overflow-y: auto;
  background-color: #111;
  color: white;
  width: 950px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const Container = styled.div`
  color: black;
  width: auto;
  gap: 10vw;
  height: 60px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const StockHeaderTemplate = () => {
  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: "삼성전자",
      stock_code: "005930",
      currentPrice: 0,
      changePrice: 0,
      changeRate: 0,
    },
  ]);

  useKRStockWebSocket(stockDataInfo, setStockDataInfo);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <HeaderWrapper>
        <ParentContainer>
          {stockDataInfo.map((stock, index) => (
            <Container key={index}>
              <StockHeaderPrice
                price={stock.currentPrice}
                changePrice={stock.changePrice}
                changeRate={stock.changeRate}
              />
              <StockHeaderInfo />
            </Container>
          ))}
        </ParentContainer>
      </HeaderWrapper>
    </>
  );
};

export default StockHeaderTemplate;
