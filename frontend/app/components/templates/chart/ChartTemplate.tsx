"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { init } from "klinecharts";
import {
  getMinuteStockData,
  getPastStockData,
} from "@/app/utils/apis/stock/getStockData";
import { useParams } from "next/navigation";
import useKRChartWebSocket from "@/app/hooks/useKRChartWebSocket";

const FullscreenButton = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  display: flex;
  flex: 0 0 55%;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

const ChartContainer = styled.div`
  height: 380px;
  overflow: hidden;
  background-color: white;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px 20px;
  align-items: center;
`;

const Option = styled.div<{ isSelected: boolean }>`
  width: 40px;
  height: auto;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: ${({ isSelected }) => (isSelected ? "#f0f0f0" : "white")};
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.05);
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  color: black;
`;

const TotalContainer = styled.div``;

const CustomHook = ({ stock_code, chart, type }) => {
  useKRChartWebSocket(stock_code, chart, type);
  return <></>;
};

const ChartTemplate = () => {
  const [chartContainerRef, setChartContainerRef] = useState(null);
  const [totalContainerRef, setTotalContainerRef] = useState(null);
  const [chart, setChart] = useState<any>(null);
  const [type, setType] = useState("M");
  const { stock, date } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const currentDate = date ?? "20241010";

  useEffect(() => {
    if (chartContainerRef) {
      const newChart = init(chartContainerRef);

      newChart?.setStyles({
        grid: {
          horizontal: {
            color: "rgba(255, 255, 255, 0.1)",
            size: 1,
          },
          vertical: {
            color: "rgba(255, 255, 255, 0.1)",
            size: 1,
          },
        },
        candle: {
          tooltip: {
            custom: [
              { title: "time", value: "{time}" },
              { title: "open", value: "{open}" },
              { title: "high", value: "{high}" },
              { title: "low", value: "{low}" },
              { title: "close", value: "{close}" },
              { title: "volume", value: "{volume}" },
              { title: "turnover", value: "{turnover}" },
            ],
          },
        },
      });

      const initChartData = async () => {
        const dataList = await getPastStockData(stock_code, type);
        console.log(dataList);
        newChart?.applyNewData(dataList);
        setChart(newChart);
      };

      initChartData();
    }
  }, [chartContainerRef]);

  interface CoinData {
    market: string;
    korean_name: string;
    english_name: string;
  }

  interface CoinState {
    currentPrice: number | null;
    changePrice: number | null;
    changeRate: number | null;
  }

  const changeType = async (type: string) => {
    chart?.clearData();
    setType(type);

    if (type === "minute") {
      const dataList = await getMinuteStockData(stock_code);
      chart?.applyNewData(dataList);
    } else {
      const dataList = await getPastStockData(stock_code, type);
      chart?.applyNewData(dataList);
    }
  };

  const isDifferentDate = () => {
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

    return formattedCurrentDate !== date;
  };

  const handleFullscreenToggle = () => {
    chart.resize();
    changeType(type);
    if (totalContainerRef) {
      const elem = totalContainerRef as any;
      if (!document.fullscreenElement) {
        elem.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  return (
    <TotalContainer ref={(el: any) => setTotalContainerRef(el)}>
      {chart ? (
        <CustomHook stock_code={stock_code} chart={chart} type={type} />
      ) : null}
      <Container>
        <OptionContainer>
          <SubTitle>종목 차트</SubTitle>
          <>
            {isDifferentDate() === false ? (
              <Option
                onClick={() => changeType("minute")}
                isSelected={type === "minute"}
              >
                1분
              </Option>
            ) : (
              ""
            )}
          </>
          <Option onClick={() => changeType("D")} isSelected={type === "D"}>
            일
          </Option>
          <Option onClick={() => changeType("M")} isSelected={type === "M"}>
            월
          </Option>
          <Option onClick={() => changeType("Y")} isSelected={type === "Y"}>
            년
          </Option>
          <FullscreenButton onClick={handleFullscreenToggle}>
            ㅇ
          </FullscreenButton>
        </OptionContainer>
        <ChartContainer
          ref={(el: any) => setChartContainerRef(el)}
        ></ChartContainer>
      </Container>
    </TotalContainer>
  );
};

export default ChartTemplate;
