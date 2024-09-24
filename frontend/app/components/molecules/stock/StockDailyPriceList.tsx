import StockDailyPrice from "../../atoms/stock/StockDailyPrice";
import StockDailyPriceSubTitle from "../../atoms/stock/StockDailyPriceSubTitle";

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
  width: 940px;
  text-align: center;
`;

interface StockDailyPriceProps {
  date: string;
  closePrice: number;
  changeRate: number;
  volume: number;
  transactionAmount: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
}

const StockDailyPriceList = () => {
  const dummyData: StockDailyPriceProps[] = [
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 95100000000,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 95100000000,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 95100000000,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 95100000000,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
    {
      date: "09.19",
      closePrice: 154742,
      changeRate: 2.54,
      volume: 620229,
      transactionAmount: 951232323124,
      openPrice: 152532,
      highPrice: 154755,
      lowPrice: 152199,
    },
  ];
  return (
    <>
      <ParentContainer>
        <StockDailyPriceSubTitle />
        <StyledHr />
        <Container>
          {dummyData.map((data, index) => (
            <StockDailyPrice
              key={index}
              date={data.date}
              closePrice={data.closePrice}
              changeRate={data.changeRate}
              volume={data.volume}
              transactionAmount={Math.floor(data.transactionAmount / 100000000)}
              openPrice={data.openPrice}
              highPrice={data.highPrice}
              lowPrice={data.lowPrice}
            />
          ))}
        </Container>
      </ParentContainer>
    </>
  );
};

export default StockDailyPriceList;
