import styled from "styled-components";
import formatPrice from "@/app/utils/stock/formatPrice";

interface CurrentPriceProps {
  currentPrice: number;
  fontSize?: number;
}

const CurrentPrice = styled.span<CurrentPriceProps>`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: bold;
`;

const StockCurrentPrice = ({
  currentPrice,
  fontSize = 13,
}: CurrentPriceProps) => {
  return (
    <>
      <CurrentPrice currentPrice={currentPrice} fontSize={fontSize}>
        {formatPrice(currentPrice)}원
      </CurrentPrice>
    </>
  );
};

export default StockCurrentPrice;
