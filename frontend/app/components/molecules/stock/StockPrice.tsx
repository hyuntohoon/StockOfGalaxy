import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import StockCurrentPrice from "../../atoms/stock/StockCurrentPrice";
import StockChange from "../../atoms/stock/StockChange";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";

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

const StockPrice = ({ tr_key }) => {
  const [price, setPrice] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [changeRate, setChangeRate] = useState(0);
  const [currentInfo, setCurrentInfo] = useState<currentInfoData>({
    stock_code: tr_key,
    stock_prpr: "0",
    prdy_vrss_sign: "2",
    prdy_vrss: "0",
    prdy_ctrt: "0",
  });

  useKRStockWebSocket(tr_key, setCurrentInfo);

  return (
    <>
      <Container>
        <StockCurrentPrice currentPrice={parseInt(currentInfo.stock_prpr)} />
        <StockChange
          changePrice={parseInt(currentInfo.prdy_vrss)}
          changeRate={parseFloat(currentInfo.prdy_ctrt)}
        />
      </Container>
    </>
  );
};

export default StockPrice;
