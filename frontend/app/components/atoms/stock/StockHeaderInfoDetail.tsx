"use client";

import styled from "@emotion/styled";
import formatPrice from "@/app/utils/libs/stock/formatPrice";

interface StockHeaderInfoDetailProps {
  target: string;
  targetPrice: number | string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockHeaderInfoDetail = ({
  target,
  targetPrice,
}: StockHeaderInfoDetailProps) => {
  return (
    <Container>
      <span>{target}</span>
      <span>
        {typeof targetPrice === "number"
          ? targetPrice.toLocaleString()
          : targetPrice}
        원
      </span>
    </Container>
  );
};

export default StockHeaderInfoDetail;
