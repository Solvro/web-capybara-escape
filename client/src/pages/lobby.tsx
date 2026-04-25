import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoom } from "../lib/use-room";

export function Lobby() {
  const { room, isConnected } = useRoom();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    if (!room) return;

    const handleStateChange = (state: any) => {
      if (state.playerState?.players) {
        setPlayers(Array.from(state.playerState.players.values()));
      }

      if (state.gameStarted) {
        navigate("/game");
      }
    };

    room.onStateChange(handleStateChange);

    handleStateChange(room.state);

    return () => {
      room.onStateChange.remove(handleStateChange);
    };
  }, [room, navigate]);

  if (!isConnected || !room) return <div>Łączenie...</div>;

  const myPlayer = players.find((p) => p.sessionId === room.sessionId);

  return (
    <div>
      <h2>Pokój: {room.roomId}</h2>

      <ul>
        {players.map((p) => (
          <li key={p.sessionId} style={{ margin: "10px 0", fontSize: "20px" }}>
            <strong>{p.name || "Anonim"}</strong> - Postać:{" "}
            {p.index === 0 ? "Sol" : "Vron"} -
            {p.ready ? " ✅ GOTOWY" : " ❌ CZEKA"}
          </li>
        ))}
      </ul>

      <button
        onClick={() => room.send("toggle_ready")}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          marginTop: "20px",
          background: "green",
        }}
      >
        {myPlayer?.ready ? "Cofnij gotowość" : "Daj gotowość"}
      </button>
    </div>
  );
}
