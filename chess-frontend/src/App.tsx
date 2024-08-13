import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./screens/Landingpage";
import { Join } from "./screens/Joinpage";
import Lobby from "./screens/Lobby";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
function App() {
  const { connect, disconnect } = useAuthStore((state) => state);
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/join" element={<Join />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
}

export default App;
