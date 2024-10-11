"use client";

import styled from "@emotion/styled";
import StockIcon from "../../atoms/stock/StockIcon";
import StockName from "../../atoms/stock/StockName";

// Props 타입 정의 (TypeScript를 사용하는 경우)
interface StockInfoProps {
  index: number;
  stock_code: string;
  koreanName: string;
}

// Emotion을 사용하여 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    gap: 5px;
  }
`;

const StockIndex = styled.span`
  color: #c3c3c6;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const StockInfo: React.FC<StockInfoProps> = ({
  index,
  stock_code,
  koreanName,
}) => {
  return (
    <Container className="stock-info-container">
      <StockIndex className="stock-index">{index + 1}</StockIndex>
      <StockIcon stock_code={stock_code} />
      <StockName koreanName={koreanName} />
    </Container>
  );
};

export default StockInfo;
