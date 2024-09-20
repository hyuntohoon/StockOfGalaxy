"use client";

import styled from "styled-components";
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

const Item = styled.div`
  flex: 1 1 calc(50% - 10px);
`;

const DividendInfo = ({ length }) => {
  const dividends = [
    { title: "PER", content: "18.2배" },
    { title: "PBR", content: "1.4배" },
    { title: "PSR", content: "1.8배" },
    // { title: "ROE", content: "15%" },
  ];

  return (
    <>
      <Container>
        {dividends.slice(0, length).map((dividend, index) => (
          <Item key={index}>
            <Dividend title={dividend.title} content={dividend.content} />
          </Item>
        ))}
      </Container>
    </>
  );
};

export default DividendInfo;
