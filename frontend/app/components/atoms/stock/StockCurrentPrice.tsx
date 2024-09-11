import styled from "styled-components";

const CurrentPrice = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const StockCurrentPrice = ({ currentPrice }) => {
  return (
    <>
      <CurrentPrice>{currentPrice}원</CurrentPrice>
    </>
  );
};

export default StockCurrentPrice;
