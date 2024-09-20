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
  const [chart, setChart] = useState<any>(null);

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
    const dataList: any[] = [];
    for (let i = 0; i < length; i++) {
      const prices: number[] = [];
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

  // -----------------------------------------------

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

  const [coinData, setCoinData] = useState<CoinData[]>([
    { market: "KRW-BTC", korean_name: "비트코인", english_name: "Bitcoin" },
  ]);

  useEffect(() => {
    const sockets: Record<string, WebSocket> = {};

    coinData.forEach((coin) => {
      const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

      socket.onopen = () => {
        console.log(`Connected to ${coin.market}`);
        socket.send(
          JSON.stringify([
            { ticket: "UNIQUE_TICKET" },
            {
              type: "ticker",
              codes: [coin.market],
              isOnlySnapshot: true,
              isOnlyRealtime: true,
            },
            { format: "DEFAULT" },
          ])
        );
      };

      socket.onmessage = async (event) => {
        const data =
          event.data instanceof Blob ? await event.data.text() : event.data;
        const jsonData = JSON.parse(data);

        const targetTimestamp = new Date("2024-09-20T09:00:00").getTime();

        chart?.updateData({
          timestamp: targetTimestamp,
          // timestamp: jsonData.trade_timestamp,

          open: jsonData.opening_price,
          high: jsonData.high_price,
          low: jsonData.low_price,
          close: jsonData.trade_price,
          volume: jsonData.acc_trade_volume,
          turnover: jsonData.acc_trade_price,
        });
      };

      socket.onclose = () => {
        console.log(`Disconnected from ${coin.market}`);
      };

      sockets[coin.market] = socket;
    });

    return () => {
      Object.values(sockets).forEach((socket) => {
        socket.close();
      });
    };
  }, [chart]);

  // -----------------------------------------------

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
        ref={(el: any) => setChartContainerRef(el)} // ref 콜백을 사용하여 상태 업데이트
      ></ChartContainer>
    </div>
  );
};

export default ChartTemplate;
