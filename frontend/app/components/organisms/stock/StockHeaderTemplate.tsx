"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockHeaderPrice from "../../molecules/stock/StockHeaderPrice";
import StockHeaderInfo from "../../molecules/stock/StockHeaderInfo";
import { HeaderWrapper } from "@/app/styles/planet";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import { GoTriangleDown } from "react-icons/go";
import { useParams, useRouter } from "next/navigation";
import { getCurrentPrice } from "@/app/utils/apis/stock/getStockData";

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

const Button = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: #c6b6d0; /* 호버시 색상 변경 */
  }
`;

interface stockState {
  stock_name: string;
  stock_code: string;
  currentPrice: number;
  changePrice: number;
  changeRate: number;
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

  const router = useRouter();
  const { stock: stockCode, date } = useParams(); // useParams로 stockCode와 date 가져오기

  useKRStockWebSocket(stockDataInfo, setStockDataInfo);

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

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClick = () => {
    if (stockCode && date) {
      router.push(`/planet/main/${stockCode}/${date}`);
    }
  };

  return (
    <HeaderWrapper>
      <Button onClick={handleClick}>
        <GoTriangleDown />
      </Button>
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
  );
};

export default StockHeaderTemplate;
