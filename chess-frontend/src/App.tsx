import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./screens/Landingpage";
import { Join } from "./screens/Joinpage";
import Lobby from "./screens/Lobby";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/join" element={<Join />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
}

export default App;
