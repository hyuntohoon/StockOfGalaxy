import styled from "styled-components";
import formatPrice from "@/app/utils/stock/formatPrice";

interface StockHeaderInfoDetailProps {
  target: string;
  targetPrice: number;
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
    <>
      <Container>
        <span>{target}</span>
        <span>{formatPrice(targetPrice)}원</span>
      </Container>
    </>
  );
};

export default StockHeaderInfoDetail;
