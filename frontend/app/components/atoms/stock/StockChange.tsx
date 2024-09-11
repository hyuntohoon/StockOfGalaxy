import styled from "styled-components";
import formatPrice from "@/app/utils/stock/formatPrice";

interface ChangePriceProps {
  $changePrice: number;
}

interface StockChangeProps {
  changePrice: number;
  changeRate: number;
}

const Container = styled.span<ChangePriceProps>`
  font-size: 12px;
  color: ${(props) => (props.$changePrice > 0 ? "red" : "blue")};
`;

const StockChange = ({ changePrice, changeRate }: StockChangeProps) => {
  return (
    <>
      <Container $changePrice={changePrice}>
        {formatPrice(changePrice)}원({changeRate.toFixed(1)}%)
      </Container>
    </>
  );
};

export default StockChange;
