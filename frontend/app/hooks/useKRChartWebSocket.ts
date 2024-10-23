import { useEffect, useState } from "react";

// 숫자를 K, M, B로 변환하는 함수
const formatNumber = (number) => {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + "B"; // Billion
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M"; // Million
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K"; // Thousand
  } else {
    return number.toString();
  }
};

const useKRChartWebSocket = (tr_key: string, chart: any, type: string) => {
  useEffect(() => {
    if (!chart) {
      return;
    }

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_BASE_URL}/ws/chart`
    );

    socket.onopen = () => {
      console.log(`Connected to ${tr_key}`);
      socket.send(tr_key);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!data || !data.closePrice) {
        return;
      }

      const currentTimeStamp = Date.now();
      const currentMinute = new Date(currentTimeStamp).getMinutes();
      const currentSecond = new Date(currentTimeStamp).getSeconds();

      const prevDataList = chart.getDataList();
      const prevData = prevDataList[prevDataList.length - 1] || {};

      const prevDataTimeStamp = prevData.timestamp || currentTimeStamp;
      const prevDataMinute = new Date(prevDataTimeStamp).getMinutes();
      const prevDataSecond = new Date(prevDataTimeStamp).getSeconds();

      let dataList = {
        timestamp: prevData.timestamp || currentTimeStamp,
        open: prevData.open || data.closePrice,
        high: Math.max(prevData.high || data.closePrice, data.closePrice),
        low: Math.min(prevData.low || data.closePrice, data.closePrice),
        close: data.closePrice,
        volume: formatNumber(data.stockAcmlVol),
        turnover: formatNumber(data.stockAcmlTrPbmn),
      };

      if (
        type === "minute" &&
        currentSecond === 0 &&
        currentMinute !== prevDataMinute
      ) {
        dataList = {
          ...dataList,
          timestamp: currentTimeStamp,
          open: data.closePrice,
          high: data.closePrice,
          low: data.closePrice,
          close: data.closePrice,
        };
      }

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
