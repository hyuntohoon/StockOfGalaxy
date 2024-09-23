import { useEffect, useState } from "react";

interface CoinState {
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const useCoinWebSocket = (market: string, chart: any) => {
  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log(`Connected to ${market}`);
      socket.send(
        JSON.stringify([
          { ticket: "UNIQUE_TICKET" },
          {
            type: "ticker",
            codes: [market],
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

      const targetTimestamp = new Date("2024-09-23T09:00:00").getTime();

      chart?.updateData({
        timestamp: targetTimestamp,
        open: jsonData.opening_price,
        high: jsonData.high_price,
        low: jsonData.low_price,
        close: jsonData.trade_price,
        volume: jsonData.acc_trade_volume,
        turnover: jsonData.acc_trade_price,
      });
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${market}`);
    };

    return () => {
      socket.close();
    };
  }, [market, chart]);
};

export default useCoinWebSocket;
