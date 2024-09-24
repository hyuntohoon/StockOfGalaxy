"use client";

import styled from "@emotion/styled";
import Dividend from "@/app/components/atoms/stock/Dividend";

const Container = styled.div`
  width: auto;
  padding: 10px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
`;

const DividendInfo = () => {
  const dividends = [
    { title: "PER", content: "18.2배" },
    { title: "PSR", content: "1.8배" },
  ];

  return (
    <>
      <Container>
        {dividends.map((dividend, index) => (
          <div key={index}>
            <Dividend title={dividend.title} content={dividend.content} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default DividendInfo;
