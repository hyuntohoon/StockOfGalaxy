import CompanyInfo from "@/app/components/organisms/stock/CompanyInfoContainer";
import DividendInfo from "@/app/components/molecules/stock/DividendInfo";
import ValuationMetrics from "@/app/components/molecules/stock/ValuationMetrics";
import FinancialMetricsContainer from "@/app/components/organisms/stock/FinancialMetricsContainer";

const TestPage = () => {
  return (
    <>
      <FinancialMetricsContainer />
      <ValuationMetrics />
      <CompanyInfo />
      <DividendInfo />
    </>
  );
};

export default TestPage;
