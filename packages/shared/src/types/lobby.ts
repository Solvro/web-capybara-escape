export const CHARACTERS = ["sol", "vron"] as const;

export type Character = (typeof CHARACTERS)[number];

export const CHARACTER_LABELS: Record<Character, string> = {
  sol: "Sol",
  vron: "Vron",
};

export function isCharacter(value: unknown): value is Character {
  return (CHARACTERS as readonly string[]).includes(value as string);
}

export function otherCharacter(character: Character): Character {
  return CHARACTERS.find((c) => c !== character)!;
}

export type LobbyPhase = "lobby" | "playing";

export interface LobbyPlayerInfo {
  sessionId: string;
  name: string;
  character: Character;
  ready: boolean;
}

export interface RoomLookupResponse {
  exists: boolean;
  roomId?: string;
  code?: string;
  phase?: LobbyPhase;
  players?: Pick<LobbyPlayerInfo, "name" | "character">[];
  screenSequenceSlug?: string;
}

export interface ReserveRoomCodeResponse {
  code: string;
}
