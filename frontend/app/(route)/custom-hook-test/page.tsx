import { useState } from "react";
import useWebSocket from "./useWebSocket"; // 위에서 만든 커스텀 훅을 불러옵니다.

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);

  // 웹소켓 메시지 수신 시 호출되는 콜백 함수
  const handleIncomingMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // 웹소켓 연결을 설정합니다.
  const { isConnected, sendMessage } = useWebSocket(
    "wss://your-websocket-url",
    handleIncomingMessage
  );

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Connection Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button
        onClick={() => sendMessage("Hello WebSocket!")}
        disabled={!isConnected}
      >
        Send Message
      </button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
