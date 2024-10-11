"use client";

import styled from "@emotion/styled";
import StockDailyPriceList from "../../molecules/stock/StockDailyPriceList";

const Container = styled.div`
  display: flex;
  flex: 0 0 35%;
  flex-direction: column;
  padding: 10px;
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
