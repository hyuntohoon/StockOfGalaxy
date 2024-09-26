"use client";

import styled from "@emotion/styled";
import Dividend from "@/app/components/atoms/stock/Dividend";

interface DividendItem {
  title: string;
  content: string;
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;

const Item = styled.div`
  flex: 1 1 calc(25% - 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(14, 34, 77, 0.2);
  }

  @media (max-width: 1024px) {
    flex: 1 1 calc(33.33% - 20px);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 15px);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const DividendInfo: React.FC = () => {
  const dividends: DividendItem[] = [
    { title: "PER", content: "18.2배" },
    { title: "PSR", content: "1.8배" },
    { title: "ROE", content: "15%" },
    { title: "배당수익률", content: "2.5%" },
    { title: "배당성향", content: "30%" },
  ];

  return (
    <Container>
      {dividends.map((dividend, index) => (
        <Item key={index}>
          <Dividend title={dividend.title} content={dividend.content} />
        </Item>
      ))}
    </Container>
  );
};

export default DividendInfo;
