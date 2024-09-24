"use client";

import styled from "@emotion/styled";
import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";

interface StockDailyPriceProps {
  date: string;
  closePrice: number;
  changeRate: number;
  volume: number;
  transactionAmount: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
}

const ParentContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
  width: 100%;
  max-width: 800px;
  height: 520px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #d9d9d9;
  margin: 20px 0;
`;

const StockDailyPriceList = () => {
  const dummyData: StockDailyPriceProps[] = [
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 95100000000,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
    {
      date: "09.18",
      closePrice: 152000,
      changeRate: -1.25,
      volume: 580000,
      transactionAmount: 90000000000,
      openPrice: 153000,
      highPrice: 154000,
      lowPrice: 151500,
    },
    {
      date: "09.17",
      closePrice: 153500,
      changeRate: 0.75,
      volume: 600000,
      transactionAmount: 92000000000,
      openPrice: 152800,
      highPrice: 153800,
      lowPrice: 152500,
    },
    // 추가 데이터는 필요에 따라 여기에 삽입하세요
  ];

  return (
    <ParentContainer>
      <StockDailyPriceSubTitle />
      <StyledHr />
      <Container>
        {dummyData.map((data, index) => (
          <StockDailyPrice
            key={index}
            date={data.date}
            closePrice={data.closePrice}
            changeRate={data.changeRate}
            volume={data.volume}
            transactionAmount={Math.floor(data.transactionAmount / 100000000)}
            openPrice={data.openPrice}
            highPrice={data.highPrice}
            lowPrice={data.lowPrice}
          />
        ))}
      </Container>
    </ParentContainer>
  );
};

export default StockDailyPriceList;
