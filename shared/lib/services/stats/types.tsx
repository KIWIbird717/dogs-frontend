import { GameServiceTypes } from "../game/types";
import { UserApiTypes } from "../users/types";

/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace StatsApiTypes {
  export type UsersByLevelDto = {
    league: number;
    pagination: number;
    start: number;
    balance?: number;
  };

  export type LeaguesStatusBar = {
    balanceFrom: GameServiceTypes.League["requiredBalance"];
    balanceTo: GameServiceTypes.League["requiredBalance"] | null;
    currentBalance: UserApiTypes.UserDto["balance"];
  };

  export type LeagueLeadersResponse = {
    myPlace: number;
    myLeague: GameServiceTypes.LeagueLevels;
    statusBar: LeaguesStatusBar | null;
    leaders: {
      _id: string;
      username: UserApiTypes.UserDto["username"];
      balance: UserApiTypes.UserDto["balance"];
      guild: UserApiTypes.UserDto["guild"] | null;
      guildName: UserApiTypes.UserDto["guildName"] | null;
      avatar?: string;
    }[];
  };
}
