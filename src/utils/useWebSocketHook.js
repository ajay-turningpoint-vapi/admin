// hooks/useWebSocketHook.js
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../services/url.service";

export const useWebSocketHook = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const parsedMessage = JSON.parse(lastMessage.data);
        setMessages((prev) => [...prev, parsedMessage]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  return {
    sendMessage,
    messages,
    readyState,
  };
};
