import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { useRoom } from "../lib/use-room";
import { PhaserGame } from "../phaser/game";

export function Game() {
  const { room, isConnected, joinError } = useRoom();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [time, setTime] = useState("00:00");
  const navigate = useNavigate();

  useEffect(() => {
    if (room !== null && isConnected) {
      return;
    }
    if (joinError) {
      return;
    }

    const timer = setTimeout(() => {
      setShowTimeoutError(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [room, isConnected, joinError]);

  if (joinError || showTimeoutError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div>
          {joinError
            ? "Nie udało się połączyć z grą."
            : "Przekroczono limit czasu połączenia. Serwer może być niedostępny."}
        </div>
        <Button
          disabled={false}
          onClick={async () => {
            await navigate("/");
          }}
        >
          Powrót do menu
        </Button>
      </div>
    );
  }

  if (room === null || !isConnected) {
    return <div>Łączenie z serwerem gry...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="arcade-font text-2xl tracking-widest text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
        {time}
      </div>
      <div className="flex h-[560px] w-[800px] items-center justify-center overflow-hidden rounded-2xl bg-violet-950">
        <PhaserGame room={room} onTimeChange={setTime} />
      </div>
    </div>
  );
}
