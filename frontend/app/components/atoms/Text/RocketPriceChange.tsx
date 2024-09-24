import styled from "styled-components";

interface RocketPriceChangeProps {
  priceChange: string;
  priceChangeSign: string;
}

const RocketPriceChange = ({ priceChange, priceChangeSign }: RocketPriceChangeProps) => {
  return (
    <PriceChangeContainer priceChangeSign={priceChangeSign}>
      {priceChangeSign} {priceChange}%
    </PriceChangeContainer>
  );
};


const PriceChangeContainer = styled.div<{ priceChangeSign: string }>`
  background-color: ${({ priceChangeSign }) =>
    priceChangeSign === "+" ? "#F02C44" : "#2C6FF0"};
  width: 60px;
  padding-block: 4px;
  border-radius: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  margin-right: 4px;
  color: #ffffff;
`;

export default RocketPriceChange;
