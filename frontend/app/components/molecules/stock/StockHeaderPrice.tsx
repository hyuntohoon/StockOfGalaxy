"use client";

import styled from "@emotion/styled";
import StockIcon from "../../atoms/stock/StockIcon";
import StockName from "../../atoms/stock/StockName";
import StockCurrentPrice from "../../atoms/stock/StockCurrentPrice";
import StockChange from "../../atoms/stock/StockChange";
import { useParams } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55px;
`;

const ChangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StockHeaderPrice = ({ stock_name, price, changePrice, changeRate }) => {
  const params = useParams();
  const { stock } = params;
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";

  return (
    <Container>
      <StockIcon stock_code={stock_code} width={55} height={55} />
      <InnerContainer>
        <StockName koreanName={stock_name} fontSize={18} />
        <ChangeContainer>
          <StockCurrentPrice currentPrice={price} fontSize={20} />
          <StockChange
            changePrice={changePrice}
            changeRate={changeRate}
            fontSize={15}
          />
        </ChangeContainer>
      </InnerContainer>
    </Container>
  );
};

export default StockHeaderPrice;
