import StockIcon from "../../atoms/stock/StockIcon";
import styled from "@emotion/styled";
import StockName from "../../atoms/stock/StockName";
import StockCurrentPrice from "../../atoms/stock/StockCurrentPrice";
import StockChange from "../../atoms/stock/StockChange";

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

const StockHeaderPrice = ({ price, changePrice, changeRate }) => {
  return (
    <>
      <Container>
        <StockIcon width={55} height={55} />
        <InnerContainer>
          <StockName koreanName="삼성전자" fontSize={18} />
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
    </>
  );
};

export default StockHeaderPrice;
