"use client";

import styled from "styled-components";

import FinancialMetricsChart from "../../molecules/stock/FinancialMetricsChart";
import FinancialMetricsSubContainer from "../../molecules/stock/FinancialMetricsSubContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  gap: 10px;
  width: 640px;
  padding: 10px;
  border-radius: 20px;
`;

const FinancialMetricsContainer = () => {
  return (
    <>
      <Container>
        <FinancialMetricsSubContainer />
        <FinancialMetricsChart />
      </Container>
    </>
  );
};

export default FinancialMetricsContainer;
