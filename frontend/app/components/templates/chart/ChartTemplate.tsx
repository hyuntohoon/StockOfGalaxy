"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { init } from "klinecharts";

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
      const newChart = init(chartContainerRef);

      newChart?.createIndicator("MA", false, { id: "candle_pane" });
      newChart?.createIndicator("VOL");

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

      newChart?.applyNewData([
        {
          timestamp: Date.now(),
          open: parseFloat((Math.random() * 1000).toFixed(2)),
          high: parseFloat((Math.random() * 1000).toFixed(2)),
          low: parseFloat((Math.random() * 1000).toFixed(2)),
          close: parseFloat((Math.random() * 1000).toFixed(2)),
          volume: Math.floor(Math.random() * 10000),
          turnover: Math.floor(Math.random() * 10000),
        },
      ]);

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

  const changeType = (type: string) => {
    chart?.clearData();

    // 임시 데이터
    // 추후 http 통신으로 데이터를 받아와서 적용해야 함
    chart?.applyNewData([
      {
        timestamp: Date.now(),
        open: parseFloat((Math.random() * 1000).toFixed(2)),
        high: parseFloat((Math.random() * 1000).toFixed(2)),
        low: parseFloat((Math.random() * 1000).toFixed(2)),
        close: parseFloat((Math.random() * 1000).toFixed(2)),
        volume: Math.floor(Math.random() * 10000),
        turnover: Math.floor(Math.random() * 10000),
      },
    ]);
    setType(type);
    console.log(new Date(Date.now()).toString().split(" "));
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
