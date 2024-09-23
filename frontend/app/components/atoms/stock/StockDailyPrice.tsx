import styled from "styled-components";
import formatPrice from "@/app/utils/libs/stock/formatPrice";

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

const StockDailyPrice = ({
  date,
  closePrice = 0,
  changeRate = 0,
  volume = 0,
  transactionAmount = 0,
  openPrice = 0,
  highPrice = 0,
  lowPrice = 0,
}: StockDailyPriceProps) => {
  return (
    <>
      <Container>
        <Column>{date}</Column>
        <Column>{formatPrice(closePrice)}원</Column>
        <Column>
          {changeRate < 0 ? "-" : "+"}
          {changeRate}%
        </Column>
        <Column>{formatPrice(volume)}</Column>
        <Column>{formatPrice(transactionAmount)}억원</Column>
        <Column>{formatPrice(openPrice)}원</Column>
        <Column>{formatPrice(highPrice)}원</Column>
        <Column>{formatPrice(lowPrice)}원</Column>
      </Container>
    </>
  );
};

export default StockDailyPrice;
