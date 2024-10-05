"use client";

import FinancialMetricsChart from "@/app/components/molecules/stock/FinancialMetricsChart";
import { ErrorBoundary } from "react-error-boundary";

const ChartPage = () => {
  const logError = (error: Error, info: { componentStack: string }) => {
    console.log(error);
    console.log(info);
  };

  return (
    <ErrorBoundary fallback={<div>Error</div>} onError={logError}>
      <FinancialMetricsChart />
    </ErrorBoundary>
  );
};

export default ChartPage;
