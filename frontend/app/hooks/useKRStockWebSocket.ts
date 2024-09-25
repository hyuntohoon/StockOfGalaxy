import { useEffect, useState } from "react";

const approval_key = process.env.NEXT_PUBLIC_APPROVAL_KEY;

const convertToTimestamp = (timeString: string) => {
  // timeString은 "HHMMSS" 형식으로 제공됨
  const hours = parseInt(timeString.substring(0, 2), 10);
  const minutes = parseInt(timeString.substring(2, 4), 10);
  const seconds = parseInt(timeString.substring(4, 6), 10);

  // 현재 날짜를 가져옴
  const today = new Date();
  today.setHours(hours, minutes, 0, 0); // 시간을 설정 (밀리초는 0으로 설정)

  // 타임스탬프 반환 (밀리초 단위)
  return today.getTime();
};

const parseWebSocketData = (data) => {
  const fields = data.split("|")[3].split("^");

  const currentData: any = {
    stock_code: fields[0],
    daily_stock_history_date: fields[1],
    open_price: parseFloat(fields[7]),
    close_price: parseFloat(fields[2]),
    high_price: parseFloat(fields[8]),
    low_price: parseFloat(fields[9]),
    stock_acml_vol: parseFloat(fields[13]),
    stock_acml_tr_pbmn: parseFloat(fields[14]),
    prdy_vrss: parseFloat(fields[4]),
    prdy_vrss_sign: fields[3],
    prdy_ctrt: parseFloat(fields[5]),
  };

  return currentData;
};

const useKRStockWebSocket = (tr_key: string, chart: any) => {
  useEffect(() => {
    let prevData: any = {};

    const socket = new WebSocket("ws://ssafy11s.com/ws-chart");

    // const socket = new WebSocket(
    //   "ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0"
    // );

    const data = `{"header": {"approval_key":"${approval_key}","custtype":"P","tr_type":"1","content-type":"utf-8"},"body": {"input": {"tr_id":"H0STCNT0","tr_key":"${tr_key}"}}}`;

    socket.onopen = () => {
      console.log(`Connected to ${tr_key}`);
      socket.send(tr_key);
      // socket.send(data);
    };

    socket.onmessage = async (event) => {
      const response = event.data.toString();

      if (response.startsWith('{"header":')) {
        return;
      }

      const jsonData = parseWebSocketData(response);

      const targetTimestamp = convertToTimestamp(
        jsonData.daily_stock_history_date
      );

      const curData = chart.getDataList();
      const len = curData.length;
      const lastedData = curData[len - 1];

      if (prevData && prevData.daily_stock_history_date) {
        const highPrice = Math.max(lastedData.high, prevData.high_price);
        const lowPrice = Math.min(lastedData.low, prevData.low_price);

        if (
          convertToTimestamp(prevData.daily_stock_history_date) ===
          targetTimestamp
        ) {
          chart?.updateData({
            timestamp: targetTimestamp,
            open: lastedData.open ? lastedData.open : jsonData.close_price,
            high: highPrice,
            low: lowPrice,
            close: jsonData.close_price,
            volume: jsonData.stock_acml_vol,
            turnover: jsonData.stock_acml_tr_pbmn,
          });
        } else {
          chart?.updateData({
            timestamp: targetTimestamp,
            open: lastedData.open ? lastedData.open : jsonData.close_price,
            high: jsonData.close_price,
            low: jsonData.close_price,
            close: jsonData.close_price,
            volume: jsonData.stock_acml_vol,
            turnover: jsonData.stock_acml_tr_pbmn,
          });
        }
      } else {
        chart?.updateData({
          timestamp: targetTimestamp,
          open: jsonData.close_price,
          high: jsonData.close_price,
          low: jsonData.close_price,
          close: jsonData.close_price,
          volume: jsonData.stock_acml_vol,
          turnover: jsonData.stock_acml_tr_pbmn,
        });
      }

      prevData = JSON.parse(JSON.stringify(jsonData));
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${tr_key}`);
    };

    return () => {
      socket.close();
    };
  }, [tr_key, chart]);
};

export default useKRStockWebSocket;
