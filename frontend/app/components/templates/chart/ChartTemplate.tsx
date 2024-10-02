"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { init } from "klinecharts";
import { getMinuteStockData } from "@/app/utils/apis/stock/getStockData";

import useKRChartWebSocket from "@/app/hooks/useKRChartWebSocket";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

const ChartContainer = styled.div`
  height: 380px;
  overflow: hidden;
  background-color: #111;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Option = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ChartTemplate = () => {
  const [chartContainerRef, setChartContainerRef] = useState(null);
  const [chart, setChart] = useState<any>(null);
  const [type, setType] = useState("minute");

  useEffect(() => {
    if (chartContainerRef) {
      const dataList = getMinuteStockData("005930");
      const newChart = init(chartContainerRef);

      // newChart.createIndicator("MA", false, { id: "candle_pane" });
      // newChart.createIndicator("VOL");

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

      setChart(newChart);
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

  useKRChartWebSocket("005930", chart, type);

  const changeType = async (type: string) => {
    chart?.clearData();
    setType(type);

    if (type === "minute") {
      const dataList = await getMinuteStockData("005930");
      console.log(dataList);
      chart?.applyNewData(dataList);
    } else {
      // getPastStockData("005930", type);
    }
  };

  return (
    <>
      <Container>
        <OptionContainer>
          <Option onClick={() => changeType("minute")}>1분</Option>
          <Option onClick={() => changeType("day")}>일</Option>
          <Option onClick={() => changeType("month")}>월</Option>
          <Option onClick={() => changeType("year")}>년</Option>
        </OptionContainer>
        <ChartContainer
          ref={(el: any) => setChartContainerRef(el)}
        ></ChartContainer>
      </Container>
    </>
  );
};

export default ChartTemplate;