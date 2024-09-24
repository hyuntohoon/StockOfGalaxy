import styled from "@emotion/styled";
import StockHeaderInfoDetail from "../../atoms/stock/StockHeaderInfoDetail";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const StockHeaderInfo = () => {
  return (
    <>
      <Container>
        <StockHeaderInfoDetail target="시가총액" targetPrice={1234} />
        {" | "}
        <StockHeaderInfoDetail target="1일 최저" targetPrice={1234} />
        {" | "}
        <StockHeaderInfoDetail target="1일 최고" targetPrice={1234} />
        {" | "}
        <StockHeaderInfoDetail target="1년 최저" targetPrice={1234} />
        {" | "}
        <StockHeaderInfoDetail target="1년 최고" targetPrice={1234} />
      </Container>
    </>
  );
};

export default StockHeaderInfo;
