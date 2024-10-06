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
import { findStockName } from "@/app/utils/apis/stock/findStockName";
import { getHeaderStockData } from "@/app/utils/apis/stock/getStockData";

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

const CustomHook = (stockDataInfo, setStockDataInfo) => {
  useKRStockWebSocket(stockDataInfo, setStockDataInfo);
  return <></>;
};

const StockHeaderTemplate = () => {
  const { stock, date } = useParams();

  const isDifferentDate = () => {
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

    return formattedCurrentDate !== date;
  };

  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const current_date = Array.isArray(date) ? date[0] : date;

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: findStockName(stock_code),
      stock_code: stock_code,
      currentPrice: 0,
      changePrice: 0,
      changeRate: 0,
    },
  ]);

  const router = useRouter();
  const { stock: stockCode } = useParams(); // useParams로 stockCode와 date 가져오기

  useEffect(() => {
    stockDataInfo.map(async (stock, index) => {
      if (isDifferentDate() == true) {
        try {
          const res = await getHeaderStockData(stock.stock_code, current_date);

          setStockDataInfo((prevStockData: any[]) => {
            return prevStockData.map((stock) =>
              res && res.stock_code && stock.stock_code === res.stock_code
                ? {
                    stock_name: stock.stock_name,
                    stock_code: res.stock_code,
                    currentPrice: res.close_price,
                    changePrice: res.prdy_vrss,
                    changeRate: res.prdy_ctrt,
                  }
                : stock
            );
          });
        } catch (error) {
          console.log(error);
        }
      } else {
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
      }
    });
  }, []);

  const handleClick = () => {
    if (stockCode && date) {
      router.push(`/planet/main/${stockCode}/${date}`);
    }
  };

  return (
    <HeaderWrapper>
      <>{isDifferentDate() == false ? <CustomHook /> : ""}</>
      <Button onClick={handleClick}>
        <GoTriangleDown />
      </Button>
      <ParentContainer>
        {stockDataInfo.map((stock, index) => (
          <Container key={index}>
            <StockHeaderPrice
              stock_name={stock.stock_name}
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
