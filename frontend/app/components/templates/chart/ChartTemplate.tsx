"use client";

import { useEffect, useRef, useState } from "react";
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
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const newChart = init(chartContainerRef.current);
      newChart?.createIndicator("MA", false, { id: "candle_pane" });
      newChart?.createIndicator("VOL");
      newChart?.applyNewData(genData());

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
  }, []);

  useEffect(() => {
    if (chart) {
      setCandleTooltipShowRule("always");
      setCandleTooltipShowType("standard");
      setIndicatorTooltipShowRule("always");
      setIndicatorTooltipShowType("standard");
    }
  }, [chart]);

  const genData = (timestamp = new Date().getTime(), length = 700) => {
    let basePrice = 5000;
    timestamp =
      Math.floor(timestamp / 1000 / 60) * 60 * 1000 -
      length * 24 * 60 * 60 * 1000;
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
      timestamp += 24 * 60 * 60 * 1000;
    }
    return dataList;
  };

  const setCandleTooltipShowRule = (showRule) => {
    chart.setStyles({
      candle: {
        tooltip: { showRule },
      },
    });
  };

  const setCandleTooltipShowType = (showType) => {
    chart.setStyles({
      candle: {
        tooltip: { showType },
      },
    });
  };

  const setIndicatorTooltipShowRule = (showRule) => {
    chart.setStyles({
      indicator: {
        tooltip: { showRule },
      },
    });
  };

  const setIndicatorTooltipShowType = (showType) => {
    chart.setStyles({
      indicator: {
        tooltip: { showType },
      },
    });
  };

  const handleTooltipRuleChange = (key, type) => {
    if (type === "candle") {
      setCandleTooltipShowRule(key);
    } else {
      setIndicatorTooltipShowRule(key);
    }
  };

  const handleTooltipTypeChange = (key, type) => {
    if (type === "candle") {
      setCandleTooltipShowType(key);
    } else {
      setIndicatorTooltipShowType(key);
    }
  };

  const handleClick = (currentTime) => {
    alert(currentTime);
  };

  return (
    <div>
      <OptionContainer>
        <Option onClick={() => handleClick(1)}>1분</Option>
        <Option onClick={() => handleClick(1440)}>일</Option>
        <Option onClick={() => handleClick(10080)}>주</Option>
        <Option onClick={() => handleClick(43800)}>월</Option>
        <Option onClick={() => handleClick(525600)}>년</Option>
      </OptionContainer>
      <ChartContainer
        ref={chartContainerRef}
        id="k-line-chart"
      ></ChartContainer>
    </div>
  );
};

export default ChartTemplate;
