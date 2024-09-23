"use client";

import styled from "styled-components";
import Dividend from "../../atoms/stock/Dividend";

const Container = styled.div`
  width: auto;
  padding: 10px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
`;

const ValuationMetrics = () => {
  const dividends = [
    { title: "PER", content: "18.2배" },
    { title: "PBR", content: "1.4배" },
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

export default ValuationMetrics;
