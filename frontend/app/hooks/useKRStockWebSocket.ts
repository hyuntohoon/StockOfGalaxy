import { useEffect, useState } from "react";

const useKRStockWebSocket = (stockDataInfo, setStockDataInfo) => {
  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_BASE_URL}/ws/stock`
    );

    socket.onopen = async () => {
      console.log("Connected to server");

      if (stockDataInfo && stockDataInfo.stockDataInfo) {
        for (const stock of stockDataInfo.stockDataInfo) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          await socket.send(stock.stock_code);
        }
      } else {
        for (const stock of stockDataInfo) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          await socket.send(stock.stock_code);
        }
      }
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);

      const updatedStockCode = messageData.stock_code;

      if (stockDataInfo && stockDataInfo.setStockDataInfo) {
        stockDataInfo.setStockDataInfo((prevStockData: any[]) => {
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
      } else {
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
      }
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
