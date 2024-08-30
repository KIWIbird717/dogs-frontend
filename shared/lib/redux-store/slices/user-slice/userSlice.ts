import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

    _id: number;
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

    _id: 0,
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
  };

  export const userSlice = createSlice({
    name: "auth",
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
        state.energyLimit = action.payload.energyLimit;
        state.friendBonusTaken = action.payload.friendBonusTaken;
        state.lastDailyReward = action.payload.lastDailyReward;
        state.rechargeMultiplication = action.payload.rechargeMultiplication;
        state.tapBotExpired = action.payload.tapBotExpired;
        state.tapMultiplication = action.payload.tapMultiplication;
        state.telegram_id = action.payload.telegram_id;
      },
    },
  });

  export const {
    setAge,
    setLevel,
    setBalance,
    setGuildName,
    setBreed,
    setCountry,
    setUser,
    setCurrentBoost,
  } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
