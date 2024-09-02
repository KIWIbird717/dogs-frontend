import { GameServiceTypes } from "../game/types";
import { UserApiTypes } from "../users/types";

/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace StatsApiTypes {
  export type UsersByLevelDto = {
    level: number;
    pagination: number;
    start: number;
    balance?: number;
  };

  type LeaguesStatusBar = {
    balanceFrom: GameServiceTypes.League["requiredBalance"];
    balanceTo: GameServiceTypes.League["requiredBalance"] | null;
    currentBalance: UserApiTypes.UserDto["balance"];
  };

  export type LeagueLeadersResponse = {
    myPlace: number;
    myLeague: GameServiceTypes.LeagueLevels;
    statusBar: LeaguesStatusBar | null;
  };
}
