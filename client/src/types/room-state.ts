export interface RoomPlayerState {
  sessionId: string;
  name: string;
  index: number;
  ready: boolean;
}

export interface RoomState {
  gameStarted?: boolean;
  playerState?: {
    players?: {
      values(): IterableIterator<RoomPlayerState>;
    };
  };
}
