import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace UserSlice {
  export type IUserSlice = {
    username: string | null;
  };

  const initialState: IUserSlice = {
    username: null,
  };

  export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      update: (state, action: PayloadAction<IUserSlice>) => {
        state = action.payload;
      },
    },
  });

  export const { update } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}
