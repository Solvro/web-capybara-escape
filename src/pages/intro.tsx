import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { ErrorContainer } from "../components/error-container";
import { Input } from "../components/input";
import { IntroContainer } from "../components/intro-container";
import { TitleHeader } from "../components/title-header";
import { useRoom } from "../lib/use-room";

export function Intro() {
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
  const [errorMessage, setErrorMessage] = useState("");

  const [countdown, setCountdown] = useState(3);

  const handlePlay = useCallback(async () => {
    if (name.trim() === "") {
      setErrorMessage("Nazwa gracza nie może być pusta.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await connect(name.trim());
      await navigate("/game");
    } catch {
      setErrorMessage("Nie udało się dołaczyć do gry. Spróbuj ponownie.");
      setStatus("error");
    }
  }, [connect, name, navigate]);

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
          <Input
            value={name}
            placeholder="Elek..."
            setValue={(value) => {
              setName(value.toUpperCase());
            }}
            disabled={status === "loading"}
          />

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
