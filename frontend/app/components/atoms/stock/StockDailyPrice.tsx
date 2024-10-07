"use client";

import styled from "@emotion/styled";
import formatPrice from "@/app/utils/libs/stock/formatPrice";

interface StockDailyPriceProps {
  stockDate: string;
  lowPrice: number;
  highPrice: number;
  startPrice: number;
  endPrice: number;
  prdyVrss: string;
  prdyVrssSign: string;
  prdyCtrt: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin: 8px 0px;
`;

const Column = styled.span`
  min-width: 100px;
  text-align: center;
`;

const PriceChangeColumn = styled(Column)<{ isPositive: boolean }>`
  color: ${(props) => (props.isPositive ? "red" : "blue")};
`;
const formatStockDate = (date: string): string => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}.${month}.${day}`;
};

const StockDailyPrice = ({
  stockDate,
  lowPrice,
  highPrice,
  startPrice,
  endPrice,
  prdyVrss,
  prdyVrssSign,
  prdyCtrt,
}: StockDailyPriceProps) => {
  const formattedCtrt = parseFloat(prdyCtrt).toFixed(2);
  const isPositive = prdyVrssSign == "5" ? false : true;

  return (
    <Container>
      <Column>{formatStockDate(stockDate)}</Column>
      <Column>{formatPrice(endPrice)}원</Column>
      <PriceChangeColumn isPositive={isPositive}>
        {prdyVrssSign == "5" ? "-" : "+"}
        {formattedCtrt}%
      </PriceChangeColumn>
      <Column>{formatPrice(startPrice)}원</Column>
      <Column>{formatPrice(highPrice)}원</Column>
      <Column>{formatPrice(lowPrice)}원</Column>
    </Container>
  );
};

export default StockDailyPrice;
