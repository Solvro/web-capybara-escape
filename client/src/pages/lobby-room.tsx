import { useParams, useSearchParams } from "react-router-dom";

import { CharacterSelectorSol } from "@/components/lobby/character-selector-sol";
import { CharacterSelectorVron } from "@/components/lobby/character-selector-vron";
import { RoomCodePanel } from "@/components/lobby/room-code-panel";
import { WaitingList } from "@/components/lobby/waiting-list";
import { useLobbyGuard } from "@/hooks/lobby/use-lobby-guard";
import { useLobbySync } from "@/hooks/lobby/use-lobby-sync";
import { useReadyUp } from "@/hooks/lobby/use-ready-up";
import { useRoom } from "@/lib/use-room";

import { IntroContainer } from "../components/intro-container";
import { TitleHeader } from "../components/ui/title-header";
import { NotFoundRoom } from "./not-found-room";

export function LobbyRoom() {
  const { roomCode = "" } = useParams();
  const normalizedRoomCode = roomCode.trim().toUpperCase();
  const [searchParams] = useSearchParams();
  const sequence = searchParams.get("sequence");
  const { room } = useRoom();

  const guardStatus = useLobbyGuard(normalizedRoomCode, sequence);
  const { solPlayer, vronPlayer, bothPresent } = useLobbySync(room);

  const mySessionId = room?.sessionId;
  const myPlayer =
    solPlayer?.sessionId === mySessionId
      ? solPlayer
      : vronPlayer?.sessionId === mySessionId
        ? vronPlayer
        : null;
  const hasReadied = myPlayer?.ready ?? false;
  const { handlePlay } = useReadyUp(room, bothPresent, hasReadied);

  const roomCodeLink = `${window.location.origin}/?code=${normalizedRoomCode}`;

  if (guardStatus === "not-found") {
    return <NotFoundRoom />;
  }

  if (guardStatus !== "ready") {
    return (
      <IntroContainer>
        <TitleHeader title="Capybara Escape" />
        <p className="text-lg text-white tomorrow-font">Ładowanie...</p>
      </IntroContainer>
    );
  }

  return (
    <IntroContainer>
      <TitleHeader title="Capybara Escape" />

      <div className="flex flex-row justify-between items-center w-3/4">
        <CharacterSelectorSol
          disabled
          selected={!!solPlayer}
          onSelect={() => {}}
          optionalDescription={
            solPlayer
              ? solPlayer.sessionId === mySessionId
                ? `${solPlayer.name} - Twój bohater`
                : `${solPlayer.name} - Już w pokoju`
              : undefined
          }
        />

        <div className="flex w-92 flex-col items-stretch gap-4 pt-8">
          <p className="text-md text-white">POCZEKALNIA</p>

          <WaitingList
            solPlayer={solPlayer}
            vronPlayer={vronPlayer}
            mySessionId={mySessionId}
            hasReadied={hasReadied}
          />

          <RoomCodePanel
            code={normalizedRoomCode}
            link={roomCodeLink}
            canPlay={bothPresent}
            hasReadied={hasReadied}
            onPlay={handlePlay}
          />
        </div>

        <CharacterSelectorVron
          disabled
          selected={!!vronPlayer}
          onSelect={() => {}}
          optionalDescription={
            vronPlayer
              ? vronPlayer.sessionId === mySessionId
                ? `${vronPlayer.name} - Twój bohater`
                : `${vronPlayer.name} - Już w pokoju`
              : undefined
          }
        />
      </div>
    </IntroContainer>
  );
}
