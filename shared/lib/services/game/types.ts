export namespace GameServiceTypes {
  export type Levels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  export type League = {
    requiredBalance: number;
  };

  export type GetLevelsResponse = Record<Levels, number>;
  export type GetLeaguesResponse = Record<Levels, League>;
}
