import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    age: number;
    breedKey: string;
    country: string;
    username: string;
    first_name: string;
    guild: string;
    balance: number;
    earnPerHour: number;
    lastDailyReward: number;
  };

  const initialState: IUserSlice = {
    age: 32,
    breedKey: "Husky",
    country: "Kazakhstan",
    first_name: "Userrr",
    username: "User",
    balance: 0,
    earnPerHour: 0,
    guild: "Dogsss",
    lastDailyReward: 0,
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
        state.age = action.payload.age;
        state.country = action.payload.country;
      },
    },
  });

  export const { setAge, setBreed, setCountry, setUser } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
