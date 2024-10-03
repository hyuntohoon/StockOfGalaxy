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
  const [type, setType] = useState("Y");
  const { stock, date } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const currentDate = date ?? "20241004";

  useEffect(() => {
    if (chartContainerRef) {
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

      const initChartData = async () => {
        const dataList = await getPastStockData(stock_code, type);
        if (!dataList) return;
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

  useKRChartWebSocket(stock_code, chart, type);

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

  return (
    <>
      <Container>
        <OptionContainer>
          <Option onClick={() => changeType("minute")}>1분</Option>
          <Option onClick={() => changeType("D")}>일</Option>
          <Option onClick={() => changeType("M")}>월</Option>
          <Option onClick={() => changeType("Y")}>년</Option>
        </OptionContainer>
        <ChartContainer
          ref={(el: any) => setChartContainerRef(el)}
        ></ChartContainer>
      </Container>
    </>
  );
};

export default ChartTemplate;
