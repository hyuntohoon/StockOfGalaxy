import styled from "@emotion/styled";
import formatPrice from "@/app/utils/stock/formatPrice";

interface ChangePriceProps {
  $changePrice: number;
  fontSize?: number;
}

interface StockChangeProps {
  changePrice: number;
  changeRate: number;
  fontSize?: number;
}

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
    <>
      <Container $changePrice={changePrice} fontSize={fontSize}>
        {formatPrice(changePrice)}원({changeRate.toFixed(1)}%)
      </Container>
    </>
  );
};

export default StockChange;
