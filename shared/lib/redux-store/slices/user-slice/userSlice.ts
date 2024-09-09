import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks";
import { RootState, store } from "../../store";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { GameSlice } from "../game-slice/gameSlice";
import { GameServiceTypes } from "@/shared/lib/services/game/types";

export namespace UserSlice {
  export type LastDailyRewardType = {
    date: Date;
    value: number;
    _id: string;
  };

  export type IUserSlice = {
    age?: number | null;
    country?: string | null;
    guild: string | null;
    guildName: string | null;
    energyLimit: number;
    friendBonusTaken: Date;
    //imageUrl: string
    lastDailyReward: LastDailyRewardType;
    rechargeMultiplication: number;
    tapBotExpired: Date;
    tapMultiplication: number;
    telegram_id: number;

    _id: string;
    __v: number;
    balance: number;
    breedKey: string;
    earnPerHour: number;
    first_name: string;
    lastOnline: Date;
    level: number;
    touches: number;
    username: string;
    doneTask: any[];
    friends: any[];

    currentBoost: number;

    lastTap: Date | null;
    eneryTankLeft: number | null;
    rechargeEnergy: number | null;
    turboBonusLeft: number | null;
    turboBoostExpired: Date | null;

    league: number;
    leagueLevel: number;
  };

  const initialState: IUserSlice = {
    age: null,
    country: null,
    guild: null,
    guildName: null,
    lastDailyReward: {
      date: new Date(),
      value: 0,
      _id: "0",
    },
    //imageUrl: string
    energyLimit: 0,
    friendBonusTaken: new Date(),
    rechargeMultiplication: 0,
    tapBotExpired: new Date(),
    tapMultiplication: 0,
    telegram_id: 0,

    _id: "0",
    __v: 0,
    balance: 0,
    breedKey: "Husky",
    earnPerHour: 0,
    first_name: "Userrr",
    lastOnline: new Date(),
    level: 0,
    touches: 0,
    username: "User",
    doneTask: [],
    friends: [],

    currentBoost: 100,

    lastTap: null,
    eneryTankLeft: null,
    rechargeEnergy: null,
    turboBonusLeft: null,
    turboBoostExpired: null,

    league: 0,
    leagueLevel: 0,
  };

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setAge: (state, action: PayloadAction<IUserSlice["age"]>) => {
        state.age = action.payload;
      },
      setBreed: (state, action: PayloadAction<IUserSlice["breedKey"]>) => {
        state.breedKey = action.payload;
      },
      setCountry: (state, action: PayloadAction<IUserSlice["country"]>) => {
        state.country = action.payload;
      },
      setGuildName: (state, action: PayloadAction<IUserSlice["guildName"]>) => {
        state.guildName = action.payload;
      },
      setBalance: (state, action: PayloadAction<IUserSlice["balance"]>) => {
        state.balance = action.payload;
      },
      setLevel: (state, action: PayloadAction<IUserSlice["level"]>) => {
        state.level = action.payload;
      },
      setCurrentBoost: (state, action: PayloadAction<IUserSlice["currentBoost"]>) => {
        state.currentBoost = action.payload;
      },
      setUser: (state, action: PayloadAction<IUserSlice>) => {
        state._id = action.payload._id;
        state.__v = action.payload.__v;
        state.balance = action.payload.balance;
        state.breedKey = action.payload.breedKey;
        state.earnPerHour = action.payload.earnPerHour;
        state.first_name = action.payload.first_name;
        state.lastOnline = action.payload.lastOnline;
        state.level = action.payload.level;
        state.touches = action.payload.touches;
        state.username = action.payload.username;
        state.doneTask = action.payload.doneTask;
        state.friends = action.payload.friends;
        state.age = action.payload.age;
        state.country = action.payload.country;
        state.guild = action.payload.guild;
        state.guildName = action.payload.guildName;
        state.energyLimit = action.payload.energyLimit;
        state.friendBonusTaken = action.payload.friendBonusTaken;
        state.lastDailyReward = action.payload.lastDailyReward;
        state.rechargeMultiplication = action.payload.rechargeMultiplication;
        state.tapBotExpired = action.payload.tapBotExpired;
        state.tapMultiplication = action.payload.tapMultiplication;
        state.telegram_id = action.payload.telegram_id;

        state.lastTap = action.payload.lastTap;
        state.eneryTankLeft = action.payload.eneryTankLeft;
        state.rechargeEnergy = action.payload.rechargeEnergy;
        state.turboBonusLeft = action.payload.turboBonusLeft;
        state.turboBoostExpired = action.payload.turboBoostExpired;

        state.league = action.payload.league;
        state.leagueLevel = action.payload.leagueLevel;
      },

      updateUser: (state, action: PayloadAction<Partial<IUserSlice>>) => {
        Object.assign(state, action.payload);
      },
      /**
       * Добавление заработка пользователю
       * + ревалидация уровня
       */
      _addCoins: (
        state,
        action: PayloadAction<
          Pick<IUserSlice, "balance"> &
            Pick<GameSlice.Type, "levels"> & { level: GameServiceTypes.Levels }
        >,
      ) => {
        state.balance += action.payload.balance;

        // revalidate user level
        if (!action.payload.levels) {
          Logger.error("Can not revalidate level in redux addCoins action. levels is null");
          return;
        }

        const balanceForNextLevel =
          action.payload.levels[(action.payload.level + 1) as GameServiceTypes.Levels];

        if (state.balance >= balanceForNextLevel) {
          state.level += 1;
        }
      },
    },
  });

  export const addCoins = createAsyncThunk(
    "user/addCoinsWithLevels",
    async (coins: number, { getState, dispatch }) => {
      const state = getState() as RootState;
      const levels = state.game.levels;
      const level = state.user.level as GameServiceTypes.Levels;

      if (levels) {
        dispatch(UserSlice._addCoins({ balance: coins, levels, level }));
      }
    },
  );

  export const {
    setAge,
    setLevel,
    setBalance,
    setGuildName,
    setBreed,
    setCountry,
    setUser,
    setCurrentBoost,
    updateUser,
    _addCoins,
  } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
