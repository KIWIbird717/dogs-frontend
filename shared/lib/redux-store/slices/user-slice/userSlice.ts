import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    age: number
    breed: string
  };

  const initialState: IUserSlice = {
    age: 32,
    breed: "Husky"
  };

  export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAge: (state, action: PayloadAction<IUserSlice["age"]>) => {
        state.age = action.payload
      },
      setBreed: (state, action: PayloadAction<IUserSlice["breed"]>) => {
        state.breed = action.payload
      },
    },
  });

  export const { setUser, setAge, setBreed } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
