import styled from "@emotion/styled";

interface CompanyInfoNameContainerProps {
  stockName: string;
  stockCode: string;
  corpDetail: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const StockName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  align-self: center;
`;

const StockCode = styled.div`
  color: #9e9ea4;
  font-size: 0.8rem;
  align-self: center;
`;

const CorpDetail = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

const CompanyInfoNameContainer = ({
  stockName,
  stockCode,
  corpDetail,
}: CompanyInfoNameContainerProps) => {
  return (
    <>
      <Container>
        <StockName>{stockName}</StockName>
        <StockCode>{stockCode}</StockCode>
      </Container>
      <CorpDetail>{corpDetail}</CorpDetail>
    </>
  );
};

export default CompanyInfoNameContainer;
