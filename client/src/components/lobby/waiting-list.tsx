import { WaitingListItem } from "@/components/lobby/waiting-list-item";
import type { LobbyPlayerView } from "@/hooks/lobby/use-lobby-sync";

interface WaitingListProps {
  solPlayer?: LobbyPlayerView;
  vronPlayer?: LobbyPlayerView;
  mySessionId?: string;
  hasReadied: boolean;
}

export function WaitingList({
  solPlayer,
  vronPlayer,
  mySessionId,
  hasReadied,
}: WaitingListProps) {
  return (
    <>
      <p className="text-lg text-white text-center tomorrow-font mt-2 mb-8">
        {hasReadied
          ? "Oczekiwanie na start. Gdy tylko druga osoba da gotowość, to gra się rozpocznie."
          : "Oczekiwanie na resztę graczy. Wyślij im kod pokoju lub link do gry, by mogli dołączyć do gry."}
      </p>

      <WaitingListItem
        index={1}
        nickname={solPlayer?.name}
        character="Sol"
        isWaiting={!solPlayer}
        isClientCharacter={!!solPlayer && solPlayer.sessionId === mySessionId}
      />

      <WaitingListItem
        index={2}
        nickname={vronPlayer?.name}
        character="Vron"
        isWaiting={!vronPlayer}
        isClientCharacter={!!vronPlayer && vronPlayer.sessionId === mySessionId}
      />
    </>
  );
}
