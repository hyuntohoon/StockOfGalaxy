import styled from "styled-components";
import RocketPrice from "../../atoms/Text/RocketPrice";
import RocketPriceChange from "../../atoms/Text/RocketPriceChange";

interface RocketPriceGroupProps {
  price: string;
  priceChange: string;
  priceChangeSign: string;
}

const RocketPriceGroup = ({ price, priceChange, priceChangeSign }: RocketPriceGroupProps) => {
  return (
    <PriceContainer>
      <RocketPrice price={price}/>
      <RocketPriceChange priceChange={priceChange} priceChangeSign={priceChangeSign}/>
    </PriceContainer>
  );
};

const PriceContainer = styled.div`
  background-color: white;
  width: 140px;
  display: flex;
  flex-direction: row;
  padding-block: 4px;
  padding-left: 8px;
  border-radius: 20px;
  text-align: start;
  font-weight: 600;
  font-size: 12px;
  color: #666666;
  justify-content: space-between;
`;

export default RocketPriceGroup;