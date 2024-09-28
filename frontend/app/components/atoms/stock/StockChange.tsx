"use client";

import styled from "@emotion/styled";
import formatPrice from "@/app/utils/libs/stock/formatPrice";

interface ChangePriceProps {
  $changePrice: number;
  fontSize?: number;
}

interface StockChangeProps {
  changePrice: number;
  changeRate: number;
  fontSize?: number;
}

// Emotion을 사용하여 스타일드 컴포넌트 정의
const Container = styled.span<ChangePriceProps>`
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => (props.$changePrice > 0 ? "red" : "blue")};
`;

const StockChange = ({
  changePrice,
  changeRate,
  fontSize = 11,
}: StockChangeProps) => {
  return (
    <Container $changePrice={changePrice} fontSize={fontSize}>
      {changePrice}원(
      {changeRate}%)
    </Container>
  );
};

export default StockChange;
