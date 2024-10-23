import styled from '@emotion/styled';

const StockInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
`;

const StockInfo: React.FC = () => {
  return (
    <StockInfoWrapper>
      <span>74,600원 +500원 (+0.6%)</span>
      <div>기타 정보</div>
    </StockInfoWrapper>
  );
};

export default StockInfo;
