import { useEffect, useState } from "react";

import formatTimeStamp from "../utils/libs/stock/formatTimestampToKoreanTime";

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
      const prevData = chart.getDataList();

      const cur = formatTimeStamp(data.timestamp);
      const prev = prevData[prevData.length - 1];
      const prevTime = formatTimeStamp(prev.timestamp);

      const dataList = {
        timestamp: prevData.timestamp,
        open: prevData.openPrice,
        high: prevData.highPrice,
        low: prevData.lowPrice,
        close: prevData.closePrice,
        volume: data.stockAcmlVol,
        turnover: data.stockAcmlTrPbmn,
      };

      console.log(cur, prevTime);

      // timestamp, open, high, low, close, volume, turnover
      if (type === "minute") {
        if (cur[cur.length - 2] != prevTime[prevTime.length - 2]) {
          dataList.timestamp = data.timestamp;
          dataList.open = data.closePrice;
          dataList.high = data.closePrice;
          dataList.low = data.closePrice;
          dataList.close = data.closePrice;
          chart.updateData(dataList);
        } else {
          dataList.timestamp = prevData.timestamp;
          dataList.high = Math.max(prevData.high, data.closePrice);
          dataList.low = Math.min(prevData.low, data.closePrice);
          chart.updateData(dataList);
        }
      } else {
        dataList.timestamp = prevData.timestamp;
        dataList.high = Math.max(prevData.high, data.high);
        dataList.low = Math.min(prevData.low, data.low);
        chart.updateData(dataList);
      }
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
