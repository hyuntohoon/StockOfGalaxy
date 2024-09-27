"use client";

import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Column = styled.span`
  min-width: 100px;
  text-align: center;
`;

const StockDailyPriceSubTitle = () => {
  return (
    <Container>
      <Column>일자</Column>
      <Column>종가</Column>
      <Column>등락률</Column>
      <Column>시가</Column>
      <Column>고가</Column>
      <Column>저가</Column>
    </Container>
  );
};

export default StockDailyPriceSubTitle;
