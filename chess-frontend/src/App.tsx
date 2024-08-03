import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./screens/Landingpage";
import { Join } from "./screens/Joinpage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
