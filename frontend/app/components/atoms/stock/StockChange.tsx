import styled from "styled-components";

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
        {changePrice}원({changeRate}%)
      </Container>
    </>
  );
};

export default StockChange;
