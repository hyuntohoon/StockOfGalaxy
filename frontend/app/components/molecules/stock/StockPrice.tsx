import styled from "@emotion/styled";
import StockCurrentPrice from "../../atoms/stock/StockCurrentPrice";
import StockChange from "../../atoms/stock/StockChange";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface currentInfoData {
  stock_code: string;
  stock_prpr: string;
  prdy_vrss_sign: string;
  prdy_vrss: string;
  prdy_ctrt: string;
}

interface StockPriceProps {
  currentPrice: number;
  changePrice: number;
  changeRate: number;
}

const StockPrice = ({
  currentPrice,
  changePrice,
  changeRate,
}: StockPriceProps) => {
  return (
    <>
      <Container>
        <StockCurrentPrice currentPrice={currentPrice} />
        <StockChange changePrice={changePrice} changeRate={changeRate} />
      </Container>
    </>
  );
};

export default StockPrice;
