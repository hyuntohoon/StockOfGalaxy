"use client";

import styled from "@emotion/styled";

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

const FinancialMetricsSubContainer = () => {
  const dividends = [
    { title: "부채비율", content: "26.66%" },
    { title: "유동비율", content: "258.26%" },
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

export default FinancialMetricsSubContainer;
