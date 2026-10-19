export type { Direction, WireDirection } from "./types/direction.js";

export type {
  Position,
  Player,
  Crate,
  Enemy,
  Capybara,
  Door,
  Button,
  Laser,
  Cable,
  Wire,
  Vent,
} from "./types/entities.js";

export {
  ClientMessageType,
  ServerMessageType,
  type MessageMapInfo,
  type MessageEnemyUpdate,
  type MessageCratesUpdate,
  type MessageCablesUpdate,
  type MessageLasersUpdate,
  type MessageDoorsAndButtonsUpdate,
  type MessagePositionUpdate,
  type MessageOnAddPlayer,
  type MessageOnRemovePlayer,
  type MessageGenerateLines,
  type MessageCapybaraUpdate,
  type MessagePlayerDamaged,
  type MessageRoomReset,
  type MessagePauseToggled,
  type MessageGameOver,
  type MessageLevelComplete,
  type MessageLevelInfo,
  type MessageDemoCompleted,
  type MessageDemoEnded,
  type MessageMove,
  type MessageSetReady,
  type MessageLobbyPlayer,
  type MessageLobbyState,
} from "./types/messages.js";

export type {
  FormattedLevel,
  FormattedLevelType,
  RoomJson,
} from "./types/levels.js";

export type {
  CreateLevelInput,
  UpdateLevelInput,
  LevelSummary,
  ListLevelsOptions,
} from "./types/api.js";

export {
  CHARACTERS,
  CHARACTER_LABELS,
  isCharacter,
  otherCharacter,
  type Character,
  type LobbyPhase,
  type LobbyPlayerInfo,
  type RoomLookupResponse,
  type ReserveRoomCodeResponse,
} from "./types/lobby.js";

export {
  getMoveVectorFromDirection,
  getDirectionFromMoveVector,
} from "./utils/vector.js";
