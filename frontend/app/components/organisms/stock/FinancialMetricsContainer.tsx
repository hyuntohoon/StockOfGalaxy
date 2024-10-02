"use client";

import styled from "@emotion/styled";
import { useEffect } from "react";
import FinancialMetricsChart from "../../molecules/stock/FinancialMetricsChart";
import FinancialMetricsSubContainer from "../../molecules/stock/FinancialMetricsSubContainer";
import { getFinancialMetricsInfo } from "@/app/utils/apis/stock/getStockInfoData";

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
  useEffect(() => {
    getFinancialMetricsInfo("005930").then((data) => {
      console.log(data);
    });
  });

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
