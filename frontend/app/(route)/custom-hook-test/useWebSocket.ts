import { useEffect, useRef, useState } from "react";

// 커스텀 훅 정의
function useWebSocket(url, onMessageCallback) {
  const ws = useRef(null); // 웹소켓 인스턴스를 담을 ref
  const [isConnected, setIsConnected] = useState(false); // 연결 상태 관리

  useEffect(() => {
    // 웹소켓 연결 시도
    ws.current = new WebSocket(url);

    // 웹소켓이 열렸을 때의 이벤트 핸들러
    ws.current.onopen = () => {
      console.log("WebSocket 연결 성공");
      setIsConnected(true);
    };

    // 웹소켓으로부터 메시지를 받을 때의 이벤트 핸들러
    ws.current.onmessage = (event) => {
      console.log("메시지 수신:", event.data);
      if (onMessageCallback) {
        onMessageCallback(event.data); // 메시지 수신 시 콜백 함수 호출
      }
    };

    // 웹소켓이 닫혔을 때의 이벤트 핸들러
    ws.current.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
      setIsConnected(false);
    };

    // 에러 발생 시의 이벤트 핸들러
    ws.current.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };

    // 컴포넌트가 언마운트될 때 웹소켓 닫기
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, onMessageCallback]);

  // 메시지 보내기 함수
  const sendMessage = (message) => {
    if (ws.current && isConnected) {
      ws.current.send(message);
    } else {
      console.log("WebSocket이 연결되어 있지 않습니다.");
    }
  };

  return { isConnected, sendMessage };
}

export default useWebSocket;
