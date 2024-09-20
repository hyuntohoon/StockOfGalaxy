import StockTemplate from "@/app/components/organisms/stock/StockTemplate";
import StockHeaderTemplate from "@/app/components/organisms/stock/StockHeaderTemplate";
import StockDailyPriceTemplate from "@/app/components/organisms/stock/StockDailyPriceTeplate";

const StockPage = () => {
  return (
    <>
      {/* <StockDailyPriceTemplate /> */}
      <StockHeaderTemplate />
      <StockTemplate />
    </>
  );
};

export default StockPage;
