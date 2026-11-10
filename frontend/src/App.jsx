import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import AnimeDetalle from "./pages/AnimeDetalle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/anime/:id" element={<AnimeDetalle />} />
    </Routes>
  );
}

export default App;