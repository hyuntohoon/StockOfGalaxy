"use client";

import FinancialMetricsChart from "@/app/components/molecules/stock/FinancialMetricsChart";
import ErrorBoundary from "@/app/components/templates/ErrorBoundary";

const ChartPage = () => {
  return (
    <ErrorBoundary>
      <FinancialMetricsChart />
    </ErrorBoundary>
  );
};

export default ChartPage;
