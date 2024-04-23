import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/scss/main.css";
import { persistor, Store } from "./redux/store";
import RootRouter from "./routes/RootRouter";
import { useEffect, useState } from "react";

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
        <RootRouter />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
