import { useEffect, useState } from "react";

const useKRChartWebSocket = (tr_key: string, setCurrentInfo: any) => {
  useEffect(() => {
    const socket = new WebSocket("ws://ssafy11s.com/api/ws-chart");

    socket.onopen = () => {
      console.log(`Connected to ${tr_key}`);
      socket.send(tr_key);
    };

    socket.onmessage = (event) => {
      console.log(event);
      setCurrentInfo(JSON.parse(event.data));
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
