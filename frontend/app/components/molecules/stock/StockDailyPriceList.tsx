import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";
import { getDailyStockData } from "../../../utils/stock/getStockData";
import { useEffect } from "react";

import styled from "@emotion/styled";

const ParentContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
  width: 400px;
  height: 520px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHr = styled.hr`
  width: 700px;
  text-align: center;
`;

interface StockDailyPriceProps {
  stockDate: string;
  lowPrice: number;
  highPrice: number;
  startPrice: number;
  endPrice: number;
  prdyVrss: string;
  prdyVrssSign: string;
  prdyCtrt: string;
}

const StockDailyPriceList = () => {
  const dummyData: StockDailyPriceProps[] | null = [
    {
      stockDate: "2024-09-26",
      lowPrice: 1000,
      highPrice: 2000,
      startPrice: 1500,
      endPrice: 1800,
      prdyVrss: "900",
      prdyVrssSign: "+",
      prdyCtrt: "200",
    },
  ];

  useEffect(() => {
    console.log(getDailyStockData("005930"));
  }, []);

  return (
    <>
      <ParentContainer>
        <StockDailyPriceSubTitle />
        <StyledHr />
        <Container>
          {dummyData.map((data, index) => (
            <StockDailyPrice
              key={index}
              stockDate={data.stockDate}
              lowPrice={data.lowPrice}
              highPrice={data.highPrice}
              startPrice={data.startPrice}
              endPrice={data.endPrice}
              prdyVrss={data.prdyVrss}
              prdyVrssSign={data.prdyVrssSign}
              prdyCtrt={data.prdyCtrt}
            />
          ))}
        </Container>
      </ParentContainer>
    </>
  );
};

export default StockDailyPriceList;
