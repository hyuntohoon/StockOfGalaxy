import Image from "next/image";

const StockIcon = ({ stock_code = "005930", width = 30, height = 30 }) => {
  return (
    <>
      <Image
        src={`/stock_logos/Stock${stock_code}.svg`}
        alt="stock-icon"
        width={width}
        height={height}
      />
    </>
  );
};

export default StockIcon;
