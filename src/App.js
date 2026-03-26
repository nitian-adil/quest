import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Puzzle from "./components/Puzzle";
import Success from "./components/Success";
import Leaderboard from "./components/Leaderboard";
import Submitted from "./components/Submitted";
import Admin from './components/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/puzzle/:id" element={<Puzzle />} />
        <Route path="/success" element={<Success />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/submitted" element={<Submitted />} />
                <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;