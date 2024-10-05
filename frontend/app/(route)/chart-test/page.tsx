"use client";

import FinancialMetricsChart from "@/app/components/molecules/stock/FinancialMetricsChart";
import { ErrorBoundary } from "react-error-boundary";

const logError = (error: Error, info: { componentStack: string }) => {
  console.log("Error:", error);
  console.log("Info:", info);
};

const FallbackComponent = ({ error, resetErrorBoundary }: any) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const ChartPage = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={logError}>
      <FinancialMetricsChart />
    </ErrorBoundary>
  );
};

export default ChartPage;
