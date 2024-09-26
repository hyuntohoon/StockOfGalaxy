import { useEffect, useState } from "react";

const useKRStockWebSocket = (tr_key: string, setCurrentInfo: any) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_BASE_URL}/api/ws-stock`
    );

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

export default useKRStockWebSocket;
