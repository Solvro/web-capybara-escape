export type FormattedLevelType = {
  maxClients: number;
  width: number;
  height: number;
  layout: string[][];
  mechanics: unknown[];
  entities: {
    players: { x: number; y: number }[];
    enemies: { x: number; y: number }[];
    crates: { x: number; y: number }[];
    vents: { x: number; y: number; open: boolean }[];
    capybara: { x: number; y: number };
  };
};
