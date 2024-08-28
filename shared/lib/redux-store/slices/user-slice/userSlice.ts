import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    age?: number | null;
    country?: string | null;
    guild: string | null;
    guildName: string | null;
    guildFounder: string | null;
    lastDailyReward: number;
    //imageUrl: string

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
  };

  const initialState: IUserSlice = {
    age: null,
    country: null,
    guild: null,
    guildName: null,
    guildFounder: null,
    lastDailyReward: 0,
    //imageUrl: string

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
        state.guildFounder = action.payload.guildFounder;
      },
    },
  });

  export const { setAge, setLevel, setBalance, setGuildName, setBreed, setCountry, setUser } =
    userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
