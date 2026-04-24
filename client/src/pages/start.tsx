import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { ErrorContainer } from "../components/error-container";
import { IntroContainer } from "../components/intro-container";
import { TitleHeader } from "../components/title-header";
import { useRoom } from "../lib/use-room";
import { CustomInput } from "../components/custom-input";

export function Start() {
  const navigate = useNavigate();
  const { connect, disconnect } = useRoom();

  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success" | "reconnecting"
  >(() => {
    return localStorage.getItem("reconnection") === null
      ? "idle"
      : "reconnecting";
  });

  const [name, setName] = useState("");
  const [mode, setMode] = useState<"join" | "create">("join");
  const [roomCode, setRoomCode] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [countdown, setCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePlay = useCallback(async () => {
    if (name.trim() === "") {
      setErrorMessage("Nazwa gracza nie może być pusta.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await connect({
        playerName: name.trim(),
        mode,
        roomCode: mode === "join" ? roomCode.trim() : undefined,
        isPrivate: mode === "create" ? isPrivate : undefined,
      });
      await navigate("/game");
    } catch {
      setErrorMessage("Nie udało się dołaczyć do gry. Spróbuj ponownie.");
      setStatus("error");
    }
  }, [connect, isPrivate, mode, name, navigate, roomCode]);

  useEffect(() => {
    if (status !== "reconnecting") {
      return;
    }

    let remaining = 3;
    setCountdown(remaining);

    const timerId = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);

      if (remaining > 0) {
        return;
      }

      window.clearInterval(timerId);

      const cachedReconnection = localStorage.getItem("reconnection");
      if (cachedReconnection === null) {
        setStatus("idle");
      } else {
        void navigate("/game");
      }
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [status, navigate]);

  useEffect(() => {
    if (status === "reconnecting") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && status !== "loading") {
        void handlePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlay, status]);

  const handleCancelReconnection = async () => {
    localStorage.removeItem("reconnection");
    await disconnect();
    setStatus("idle");
    setCountdown(3);
  };

  return (
    <IntroContainer>
      <TitleHeader title="Capybara Escape" />

      {status === "reconnecting" ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-amber-200">
            Próba ponownego połączenia za {countdown}...
            <br />
          </p>
          <Button disabled={false} onClick={handleCancelReconnection}>
            Anuluj ponowne połączenie.
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMode("join");
              }}
              className={`flex-1 rounded p-2 ${mode === "join" ? "bg-violet-600" : "bg-violet-800"}`}
            >
              Join
            </button>
            <button
              onClick={() => {
                setMode("create");
              }}
              className={`flex-1 rounded p-2 ${mode === "create" ? "bg-violet-600" : "bg-violet-800"}`}
            >
              Create
            </button>
          </div>
          <CustomInput
            value={name}
            placeholder="Elek..."
            setValue={(value) => {
              setName(value.toUpperCase());
            }}
            disabled={status === "loading"}
          />
          {mode === "join" ? (
            <input
              type="text"
              placeholder="KOD POKOJU"
              className="rounded border border-violet-700 bg-violet-950 p-2 text-white outline-none placeholder:text-violet-400 focus:border-amber-400"
              value={roomCode}
              onChange={(error) => {
                setRoomCode(error.target.value);
              }}
            />
          ) : (
            <label className="flex cursor-pointer items-center gap-2 text-white">
              <input
                type="checkbox"
                className="h-4 w-4 accent-violet-600"
                checked={isPrivate}
                onChange={(error) => {
                  setIsPrivate(error.target.checked);
                }}
              />
              Pokój prywatny
            </label>
          )}

          <Button
            onClick={handlePlay}
            disabled={status === "loading" || name.trim() === ""}
          >
            {status === "loading" ? "Ładowanie..." : "Graj"}
          </Button>
        </>
      )}

      {status === "error" && <ErrorContainer errorMessage={errorMessage} />}
    </IntroContainer>
  );
}
