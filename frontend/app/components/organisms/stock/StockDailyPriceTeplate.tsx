"use client";

import styled from "@emotion/styled";
import StockDailyPriceTitle from "../../atoms/stock/StockDailyPriceTitle";
import StockDailyPriceList from "../../molecules/stock/StockDailyPriceList";

const Container = styled.div`
  position: fixed;
  width: 500px;
  height: 440px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
`;

const StockDailyPriceTemplate = () => {
  return (
    <>
      <Container>
        <StockDailyPriceTitle />
        <StockDailyPriceList />
      </Container>
    </>
  );
};

export default StockDailyPriceTemplate;
