import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";
import { getDailyStockData } from "../../../utils/apis/stock/getStockData";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";

const ParentContainer = styled.div`
  padding: 20px;
  border-radius: 15px
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 90%;
  max-height: 580px;
  max-width: 580px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 95%;
  overflow-x: auto;
  overflow-y: auto;

  /* Firefox용 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: grey transparent;

  /* WebKit 기반 브라우저에서 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비를 명시적으로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #03e9f4; /* 스크롤바 핸들의 배경색 */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 트랙의 배경을 투명하게 설정 */
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  color: black;
`;

const StyledHr = styled.hr`
  width: 100%;
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
        <StyledHr />
        <Container onWheel={handleWheel}>
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
