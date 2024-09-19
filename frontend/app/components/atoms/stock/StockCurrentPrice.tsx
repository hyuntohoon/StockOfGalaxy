import styled from "styled-components";
import formatPrice from "@/app/utils/stock/formatPrice";

const CurrentPrice = styled.span`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: bold;
`;

const StockCurrentPrice = ({ currentPrice, fontSize = 13 }) => {
  return (
    <>
      <CurrentPrice fontSize={fontSize}>
        {formatPrice(currentPrice)}원
      </CurrentPrice>
    </>
  );
};

export default StockCurrentPrice;
