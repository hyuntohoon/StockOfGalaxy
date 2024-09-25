import { useEffect, useState } from "react";

const useKRStockWebSocket = (tr_key: string, setCurrentInfo: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://ssafy11s.com/ws-stock");

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

  return data;
};

export default useKRStockWebSocket;
