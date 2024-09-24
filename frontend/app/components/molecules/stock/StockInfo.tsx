import StockIcon from "../../atoms/stock/StockIcon";
import StockName from "../../atoms/stock/StockName";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const StockIndex = styled.span`
  color: #c3c3c6;
`;

const StockInfo = ({ index, koreanName }) => {
  return (
    <>
      <Container className="stock-info-container">
        <StockIndex className="stock-index">{index + 1}</StockIndex>
        <StockIcon />
        <StockName koreanName={koreanName} />
      </Container>
    </>
  );
};

export default StockInfo;
