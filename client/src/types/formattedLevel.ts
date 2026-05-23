export type FormattedLevelType = {
  maxClients: number;
  width: number;
  height: number;
  layout: string[][];
  mechanics: unknown[];
  entities: {
    players: unknown[];
    enemies: unknown[];
    crates: unknown[];
  };
};
