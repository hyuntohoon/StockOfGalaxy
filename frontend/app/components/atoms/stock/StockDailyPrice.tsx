import styled from "@emotion/styled";
import formatPrice from "@/app/utils/stock/formatPrice";

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
  return (
    <>
      <Container>
        <Column>{stockDate}</Column>
        <Column>{formatPrice(endPrice)}원</Column>
        <Column>
          {prdyVrssSign == "-" ? "-" : "+"}
          {prdyVrss}({prdyCtrt})%
        </Column>
        <Column>{formatPrice(startPrice)}원</Column>
        <Column>{formatPrice(highPrice)}원</Column>
        <Column>{formatPrice(lowPrice)}원</Column>
      </Container>
    </>
  );
};

export default StockDailyPrice;
