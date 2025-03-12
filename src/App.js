import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/scss/main.css";
import { persistor, Store } from "./redux/store";
import RootRouter from "./routes/RootRouter";
import { createContext, useEffect, useState } from "react";
import { useWebSocketHook } from "./utils/useWebSocketHook.js";

export const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const ws = useWebSocketHook();
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      toast.error("You are offline");
    }
  }, [isOnline]);
  return (
    <Provider store={Store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <WebSocketProvider>
          <RootRouter />
          <Toaster />
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
