import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    age: number
    breed: string
    country: string
  };

  const initialState: IUserSlice = {
    age: 32,
    breed: "Husky",
    country: "Kazakhstan"
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
      setCountry: (state, action: PayloadAction<IUserSlice["country"]>) => {
        state.country = action.payload
      },
    },
  });

  export const { setAge, setBreed, setCountry } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
