import styled from "@emotion/styled";
import formatPrice from "@/app/utils/stock/formatPrice";

interface FontSize {
  $fontSize: number;
}

interface CurrentPriceProps {
  currentPrice: number;
  fontSize?: number;
}

const CurrentPrice = styled.span<FontSize>`
  font-size: ${(props) => `${props.$fontSize}px`};
  font-weight: bold;
`;

const StockCurrentPrice = ({
  currentPrice,
  fontSize = 13,
}: CurrentPriceProps) => {
  return (
    <>
      <CurrentPrice $fontSize={fontSize}>
        {formatPrice(currentPrice)}원
      </CurrentPrice>
    </>
  );
};

export default StockCurrentPrice;
