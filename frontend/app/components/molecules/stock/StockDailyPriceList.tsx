import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";
import { getDailyStockData } from "../../../utils/apis/stock/getStockData";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";

const ParentContainer = styled.div`
  padding: 20px;
  border-radius: 15px;
  height: 90%;
  max-height: 580px;
  max-width: 580px;
`;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  min-width: 100%;
  min-height: 100%;

  max-width: 600px;
  max-height: 380px;
  overflow-x: auto !important;
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* 스크롤바의 핸들 스타일 설정 */
  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888; /* 호버 시 진한 회색으로 변경 */
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  color: black;
`;

const StyledHr = styled.hr`
  width: 120%;
  border: none;
  border-top: 2px solid #bbb;
  border-bottom: 2px solid #fff;
  margin: 10px 0;
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 전파를 막음
  };

  return (
    <>
      <ParentContainer>
        <SubTitle>일별 시세</SubTitle>
        <Container onWheel={handleWheel}>
          <StockDailyPriceSubTitle />
          <StyledHr />
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
