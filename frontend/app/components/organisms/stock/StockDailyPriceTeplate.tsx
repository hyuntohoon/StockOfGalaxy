"use client";

import styled from "styled-components";
import StockDailyPriceTitle from "../../atoms/stock/StockDailyPriceTitle";
import StockDailyPriceList from "../../molecules/stock/StockDailyPriceList";

const Container = styled.div`
  width: 400px;
  height: 520px;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
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
