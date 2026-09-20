import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { CharacterSelect } from "@/pages/character-select";
import { Creator } from "@/pages/creator";
import { Game } from "@/pages/game";
import { LobbyRoom } from "@/pages/lobby-room";
import { NotFoundRoom } from "@/pages/not-found-room";
import { Playground } from "@/pages/playground";

export function App() {
  return (
    <div className="arcade-font flex min-h-screen bg-background text-white">
      <Router>
        <Routes>
          <Route path="/" element={<CharacterSelect />} />
          <Route path="/lobby" element={<LobbyRoom />} />
          <Route path="/not-found-room" element={<NotFoundRoom />} />
          <Route path="/game" element={<Game />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
