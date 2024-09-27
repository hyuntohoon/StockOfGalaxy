import { useEffect, useState } from "react";

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, 200 * ms));
};

const useKRStockWebSocket = (stockData, setStockDataInfo: any) => {
  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_BASE_URL}/ws/stock`
    );

    socket.onopen = async () => {
      console.log("Connected to server");

      stockData.forEach((stock) => {
        console.log(stock.stock_code);
      });

      stockData.forEach(async (stock) => {
        await delay(1);
        socket.send(stock.stock_code);
      });
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const updatedStockCode = messageData.stock_code;

      setStockDataInfo((prevStockData: any[]) => {
        return prevStockData.map((stock) =>
          stock.stock_code === updatedStockCode
            ? {
                stock_name: stock.stock_name,
                stock_code: updatedStockCode,
                currentPrice: messageData.stock_prpr,
                changePrice: messageData.prdy_vrss,
                changeRate: messageData.prdy_ctrt,
              }
            : stock
        );
      });
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => {
      socket.close();
    };
  }, []);
};

export default useKRStockWebSocket;
