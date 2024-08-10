import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    age: number;
    country: string;
    guild: string | null;
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
    age: 0,
    country: "none",
    guild: null,
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
      },
    },
  });

  export const { setAge, setBreed, setCountry, setUser } = userSlice.actions;
  export const { setAge, setBreed, setCountry, setUser } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
