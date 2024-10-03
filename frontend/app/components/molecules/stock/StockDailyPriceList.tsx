import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";
import { getDailyStockData } from "../../../utils/apis/stock/getStockData";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";

const ParentContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  height: 90%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

const StyledHr = styled.hr`
  width: 170%;
  border: none;
  border-top: 1px solid #d9d9d9;
  margin: 20px 0;
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
  const { stock } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";

  const [dummyData, setDummyData] = useState<StockDailyPriceProps[]>([
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
    {
      stockDate: "2024-09-25",
      lowPrice: 1000,
      highPrice: 2000,
      startPrice: 1500,
      endPrice: 1800,
      prdyVrss: "900",
      prdyVrssSign: "-",
      prdyCtrt: "200",
    },
    {
      stockDate: "2024-09-24",
      lowPrice: 1000,
      highPrice: 2000,
      startPrice: 1500,
      endPrice: 1800,
      prdyVrss: "900",
      prdyVrssSign: "+",
      prdyCtrt: "200",
    },
    {
      stockDate: "2024-09-23",
      lowPrice: 1000,
      highPrice: 2000,
      startPrice: 1500,
      endPrice: 1800,
      prdyVrss: "900",
      prdyVrssSign: "-",
      prdyCtrt: "200",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const dataList = await getDailyStockData(stock_code);
      // setDummyData(dataList);
    };

    getData();
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
