import { UserSlice } from "../../redux-store/slices/user-slice/userSlice";

/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace UserApiTypes {
  export type UserDto = {
    age: number;
    first_name: string;
    country: string;
    breedKey: string;
    username: string;
    guild: string;
    balance: number;
    earnPerHour: number;
    lastDailyReward: number;
  };

  export type EarnDto = {
    startTimestamp: Date;
    taps: number;
  };

  export type UpdateUserDto = Partial<UserDto>;

  export type ResponseEarnDto = {
    balance: number;
    level: number;
    serverEnergy: number;
  };

  export enum BoostName {
    TURBO = "TURBO",
    FULL_TANK = "FULL_TANK",
    MULTITAP = "MULTITAP",
    ENERY_LIMIT = "ENERY_LIMIT",
    RECHARGE_SPEED = "RECHARGE_SPEED",
    TAP_BOT = "TAP_BOT",
  }

  export type BoostResponse = {
    boost: keyof typeof BoostName;
    TURBO: Date;
    turboBonusLeft: number;
    FULL_TANK: boolean;
    tankBonusLeft: number;
    MULTITAP: number;
    ENERY_LIMIT: number;
    RECHAGE_SPEED: number;
    TAP_BOT: Date;
  };

  export type DailyRewardResponse = {
    currentLevel: number;
    nextBonus: number;

    nextLevel: number;
    timestamp: number;
  };

  export type BonusFriendResponse = {
    nextUsage: Date;
    amount: 0;
  };

  export type MyFriendsResponse = {
    username: string;
    balance: number;
    guild: null | string;
    league: number;
    breedKey: string;
    level: number;
  };

  export type IAmFromInviteLinkDto = {
    invitedByTgUserId: number;
  };

  export type IAmFromInviteLinkResponse = {
    inviter: {
      _id: UserSlice.Type["_id"];
      username: UserSlice.Type["username"];
      balance: UserSlice.Type["balance"];
      level: UserSlice.Type["level"];
      league: UserSlice.Type["league"];
    };
    timestamp: number;
  };
}
