import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CharacterSelectorSol } from "@/components/lobby/character-selector-sol";
import { CharacterSelectorVron } from "@/components/lobby/character-selector-vron";
import { INTRO_CHARACTERS } from "@/constants/global";

import { IntroContainer } from "../components/intro-container";
import { Button } from "../components/ui/button";
import { CustomInput } from "../components/ui/custom-input";
import { ErrorContainer } from "../components/ui/error-container";
import { TitleHeader } from "../components/ui/title-header";
import { useRoom } from "../lib/use-room";

export function CharacterSelect() {
  const navigate = useNavigate();
  const { connect, disconnect } = useRoom();
  const [searchParams] = useSearchParams();
  const screenSequenceSlug = searchParams.get("sequence") ?? undefined;

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
      await connect(name.trim(), screenSequenceSlug);
      await navigate("/game");
    } catch {
      setErrorMessage("Nie udało się dołaczyć do gry. Spróbuj ponownie.");
      setStatus("error");
    }
  }, [connect, name, navigate, screenSequenceSlug]);

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
          <div className="flex flex-row justify-between items-center w-3/4">
            <CharacterSelectorSol
              disabled={true}
              selected={true}
              onSelect={() => {}}
              optionalDescription="Wybrany bohater"
            />

            <div className="flex flex-col items-center gap-4 pt-8">
              <p className="text-md text-white">WSKOCZ DO GRY</p>
              <div className="flex flex-col items-center">
                <p className="text-lg text-white tomorrow-font mb-2">
                  Twój Nick
                </p>
                <CustomInput
                  value={name}
                  placeholder="Elek..."
                  setValue={(value) => {
                    setName(value.toUpperCase());
                  }}
                  disabled={status === "loading"}
                  className="my-2"
                />
                <p className="text-md text-white tomorrow-font mt-4">
                  Wybrana postać: {INTRO_CHARACTERS.SOL.name}
                </p>
              </div>

              <Button
                onClick={handlePlay}
                disabled={status === "loading" || name.trim() === ""}
                className="w-full tomorrow-font font-bold py-2 mt-12"
              >
                {status === "loading" ? "Ładowanie..." : "Stwórz nowy pokój"}
              </Button>

              <p className="text-md text-white mt-2">LUB</p>

              <div className="flex flex-col items-center my-2">
                <CustomInput
                  value=""
                  placeholder="Twój kod pokoju"
                  setValue={() => {}}
                  disabled={true}
                />
                <Button
                  onClick={() => {}}
                  disabled={true}
                  className="w-full tomorrow-font font-bold py-2 my-4"
                >
                  Dołącz do pokoju
                </Button>
              </div>
            </div>

            <CharacterSelectorVron selected={false} onSelect={() => {}} />
          </div>
        </>
      )}

      {status === "error" && <ErrorContainer errorMessage={errorMessage} />}
    </IntroContainer>
  );
}
