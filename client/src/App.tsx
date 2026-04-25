import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Creator } from "./pages/creator";
import { Game } from "./pages/game";
import { Intro } from "./pages/intro";
import { Lobby } from "./pages/lobby";
import { Playground } from "./pages/playground";
import { Start } from "./pages/start";

export function App() {
  return (
    <div className="arcade-font flex min-h-screen items-center justify-center bg-violet-950 text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/start" element={<Start />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Router>
    </div>
  );
}
