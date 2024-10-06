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
  daily_stock_history_date: string;
  low_price: number;
  high_price: number;
  open_price: number;
  close_price: number;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
}

const StockDailyPriceList = () => {
  const { stock } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";

  const [dummyData, setDummyData] = useState<StockDailyPriceProps[]>([
    {
      daily_stock_history_date: "20240926",
      low_price: 1000,
      high_price: 2000,
      open_price: 1500,
      close_price: 1800,
      prdy_vrss: "900",
      prdy_vrss_sign: "+",
      prdy_ctrt: "200",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const dataList = await getDailyStockData(stock_code);
      setDummyData(dataList.slice(0, 90));
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
              stockDate={data.daily_stock_history_date}
              lowPrice={data.low_price}
              highPrice={data.high_price}
              startPrice={data.open_price}
              endPrice={data.close_price}
              prdyVrss={data.prdy_vrss}
              prdyVrssSign={data.prdy_vrss_sign}
              prdyCtrt={data.prdy_ctrt}
            />
          ))}
        </Container>
      </ParentContainer>
    </>
  );
};

export default StockDailyPriceList;
