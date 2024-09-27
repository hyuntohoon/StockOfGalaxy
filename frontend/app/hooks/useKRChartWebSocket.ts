import { useEffect, useState } from "react";

const useKRChartWebSocket = (tr_key: string, chart: any) => {
  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_BASE_URL}/api/ws-chart`
    );

    socket.onopen = () => {
      console.log(tr_key);
      console.log(`Connected to ${tr_key}`);
      socket.send(tr_key);
    };

    socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);

      // timestamp, open, high, low, close, volume, turnover
      const dataList = [
        {
          timestamp: Date.now(),
          open: data.openPrice,
          high: data.highPrice,
          low: data.lowPrice,
          close: data.closePrice,
          volume: data.stockAcmlVol,
          turnover: data.stockAcmlTrPbmn,
        },
      ];

      chart.updateData(dataList);
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${tr_key}`);
    };

    return () => {
      socket.close();
    };
  }, [tr_key]);
};

export default useKRChartWebSocket;
