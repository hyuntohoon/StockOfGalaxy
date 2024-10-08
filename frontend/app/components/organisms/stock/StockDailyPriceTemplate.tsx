"use client";

import styled from "@emotion/styled";
import StockDailyPriceTitle from "../../atoms/stock/StockDailyPriceTitle";
import StockDailyPriceList from "../../molecules/stock/StockDailyPriceList";

const Container = styled.div`
  display: flex;
  flex: 0 0 35%;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
`;

const StockDailyPriceTemplate = () => {
  return (
    <>
      <Container>
        <StockDailyPriceList />
      </Container>
    </>
  );
};

export default StockDailyPriceTemplate;
