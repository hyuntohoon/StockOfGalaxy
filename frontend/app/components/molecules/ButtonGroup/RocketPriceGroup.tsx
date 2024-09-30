import styled from '@emotion/styled';
import RocketPrice from "../../atoms/Text/RocketPrice";
import RocketPriceChange from "../../atoms/Text/RocketPriceChange";
import { RocketPriceGroupProps } from '@/app/types/rocket';

const RocketPriceGroup = ({ stockPrice, priceChange, priceChangeSign }: RocketPriceGroupProps) => {
  return (
    <PriceContainer>
      <RocketPrice price={stockPrice}/>
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