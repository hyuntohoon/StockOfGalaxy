"use client";

import { useEffect, useState } from "react";
import { init } from "klinecharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 500px;
  height: 300px;
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
  // useState로 chartContainerRef를 관리
  const [chartContainerRef, setChartContainerRef] = useState(null);
  const [chart, setChart] = useState(null);

  // DOM이 설정된 후 chart 초기화
  useEffect(() => {
    if (chartContainerRef) {
      const newChart = init(chartContainerRef);
      newChart?.createIndicator("MA", false, { id: "candle_pane" });
      newChart?.createIndicator("VOL");
      newChart?.applyNewData(genData("day"));

      newChart?.setStyles({
        grid: {
          horizontal: {
            color: "rgba(255, 255, 255, 0.2)",
            size: 1,
          },
          vertical: {
            color: "rgba(255, 255, 255, 0.2)",
            size: 1,
          },
        },
      });

      setChart(newChart);
    }
  }, [chartContainerRef]); // chartContainerRef가 변경될 때 초기화 실행

  // 데이터 생성 함수
  const genData = (
    interval,
    timestamp = new Date().getTime(),
    length = 700
  ) => {
    let basePrice = 5000;
    const intervalToMs = {
      minute: 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000,
    };
    const intervalMs = intervalToMs[interval] || intervalToMs["day"];

    timestamp =
      Math.floor(timestamp / intervalMs) * intervalMs - length * intervalMs;
    const dataList = [];
    for (let i = 0; i < length; i++) {
      const prices = [];
      for (let j = 0; j < 4; j++) {
        prices.push(basePrice + Math.random() * 60 - 30);
      }
      prices.sort();
      const open = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const high = +prices[3].toFixed(2);
      const low = +prices[0].toFixed(2);
      const close = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const volume = Math.round(Math.random() * 100) + 10;
      const turnover = ((open + high + low + close) / 4) * volume;
      dataList.push({ timestamp, open, high, low, close, volume, turnover });

      basePrice = close;
      timestamp += intervalMs;
    }
    return dataList;
  };

  const updateData = () => {
    if (chart) {
      const newData = {
        timestamp: new Date().getTime(),
        open: 5020 + Math.random() * 20,
        high: 5040 + Math.random() * 20,
        low: 5010 + Math.random() * 20,
        close: 5030 + Math.random() * 20,
        volume: Math.round(Math.random() * 100) + 10,
        turnover: Math.round(Math.random() * 1000) + 100,
      };
      chart.updateData(newData);
    }
  };

  return (
    <div>
      <OptionContainer>
        <Option onClick={() => chart?.applyNewData(genData("minute"))}>
          1분
        </Option>
        <Option onClick={() => chart?.applyNewData(genData("day"))}>일</Option>
        <Option onClick={() => chart?.applyNewData(genData("week"))}>주</Option>
        <Option onClick={() => chart?.applyNewData(genData("month"))}>
          월
        </Option>
        <Option onClick={() => chart?.applyNewData(genData("year"))}>년</Option>
      </OptionContainer>
      <ChartContainer
        ref={(el) => setChartContainerRef(el)} // ref 콜백을 사용하여 상태 업데이트
      ></ChartContainer>
    </div>
  );
};

export default ChartTemplate;
