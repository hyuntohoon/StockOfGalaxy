import { useCallback, useEffect, useState } from "react";

const useKRChartWebSocket = (tr_key: string, chart: any, type: string) => {
  useEffect(() => {
    if (!chart) {
      return;
    }

    const socket = new WebSocket("ws://localhost:8080");
    // const socket = new WebSocket(
    //   `${process.env.NEXT_PUBLIC_WS_BASE_URL}/api/ws-chart`
    // );

    socket.onopen = () => {
      console.log(`Connected to ${tr_key}`);
      socket.send(tr_key);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // timestamp, open, high, low, close, volume, turnover
      const dataList = {
        timestamp: data.timestamp,
        open: data.openPrice,
        high: data.highPrice,
        low: data.lowPrice,
        close: data.closePrice,
        volume: data.stockAcmlVol,
        turnover: data.stockAcmlTrPbmn,
      };

      // type에 따라 데이터를 누적할지 새로 추가할지 결정하는 로직 필요
      chart.updateData(dataList);
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${tr_key}`);
    };

    return () => {
      socket.close();
    };
  }, [tr_key, chart, type]);
};

export default useKRChartWebSocket;
