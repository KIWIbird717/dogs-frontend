/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace UserApiTypes {
  export interface User {
    _id: string;
    telegram_id: number;
    hasTelegramPremium: boolean;
    age?: number;
    country?: string;
    first_name: string;
    username: string;
    guild?: string; // Идентификатор или объект Guild
    guildName?: string | null;
    friends: {
      id: string;
      isFirsBonusClaimed: boolean;
      hasPremium: boolean;
      lastBalance: number;
    }[];
    doneTasks: string[];
    balance: number;
    level: number;
    rechargeEnergy: number;
    friendBonusTaken: Date;
    earnPerHour: number;
    lastDailyReward: {
      date: Date;
      value: number;
    };
    lastTap: Date;
    breedKey: string;
    touches: number;
    lastOnline?: Date;
    league: number;
    invitedBy?: string | null;
    avatar?: string;
    avatarId?: string;
    avatarUpdateDate?: Date;
    boosts: {
      multitap: {
        level: number;
        tapMultiplication: number;
        energyClaimMultiplication: number;
        upgradePrice: number;
      };
      energyLimit: {
        level: number;
        upgradePrice: number;
        energyLimit: number;
      };
      rechargingSpeed: {
        level: number;
        energyRechargeMultiplication: number;
        upgradePrice: number;
      };
      tapBot: {
        price: number;
        activeFor: Date;
      };
      fullTank: {
        fullTankLeft: number;
        availableToClaimIn: Date;
      };
      turbo: {
        activeFor: Date;
        turboLeft: number;
        multiplication: number;
      };
    };
  }

  export type UserDto = {
    age: number;
    first_name: string;
    country: string;
    breedKey: string;
    username: string;
    guild: string | null;
    guildName: string | null;
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

  export type BoostResponse = Pick<User, "boosts" | "balance">;

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
    guild?: null | string;
    guildName?: string | null;
    league?: number;
    breedKey?: string;
    level: number;
    avatar?: string;
  };

  export type IAmFromInviteLinkDto = {
    invitedByTgUserId: number;
  };

  export type IAmFromInviteLinkResponse = {
    inviter: {
      _id: User["_id"];
      username: User["username"];
      balance: User["balance"];
      level: User["level"];
      league: User["league"];
    };
    timestamp: number;
  };

  export type GetBonusDailyResponse = {
    level: number;
    bonus: number;
    balance: number;
    avaliableTimer: number;
  };

  export type GetMeResponseType = User;
}
