"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import StockHeaderInfoDetail from "../../atoms/stock/StockHeaderInfoDetail";
import { getHeaderStockData } from "../../../utils/apis/stock/getStockData";

interface StockHeaderInfoProps {
  // 필요한 경우 추가적인 props를 정의할 수 있습니다.
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #0e224d;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    font-size: 14px;
    gap: 8px;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
  color: #0e224d9e;

  @media (max-width: 600px) {
    margin: 0 3px;
  }
`;

const StockHeaderInfo: React.FC<StockHeaderInfoProps> = () => {
  const { stock, date } = useParams();
  const stock_code: string = Array.isArray(stock)
    ? stock[0]
    : stock ?? "005930";

  const current_date: string = Array.isArray(date) ? date[0] : date;
  const [dividends, setDividends] = useState<any[]>([
    { target: "시가총액", targetPrice: 0 },
    { target: "1일 최저", targetPrice: 0 },
    { target: "1일 최고", targetPrice: 0 },
    { target: "1년 최저", targetPrice: 0 },
    { target: "1년 최고", targetPrice: 0 },
  ]);

  useEffect(() => {
    const getStockData = async () => {
      const res = await getHeaderStockData(stock_code, current_date);

      setDividends([
        {
          target: "시가총액",
          targetPrice:
            res && res.market_capitalization
              ? (parseInt(res.market_capitalization) / 10000)
                  .toFixed(2)
                  .toString() + "조"
              : "0.00조",
        },
        { target: "1일 최저", targetPrice: parseInt(res.low_price) },
        { target: "1일 최고", targetPrice: parseInt(res.high_price) },
        { target: "1년 최저", targetPrice: parseInt(res.year_low_price) },
        { target: "1년 최고", targetPrice: parseInt(res.year_high_price) },
      ]);
    };

    getStockData();
  }, []);

  return (
    <Container>
      {dividends.map((dividend, index) => (
        <React.Fragment key={index}>
          <StockHeaderInfoDetail
            target={dividend.target}
            targetPrice={dividend.targetPrice}
          />
          {index < dividends.length - 1 && <Separator> | </Separator>}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default StockHeaderInfo;
