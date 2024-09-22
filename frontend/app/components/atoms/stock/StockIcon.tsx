import Image from "next/image";

const StockIcon = ({ width = 30, height = 30 }) => {
  return (
    <>
      <Image
        src="https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock035420.svg"
        alt="stock-icon"
        width={width}
        height={height}
      />
    </>
  );
};

export default StockIcon;
