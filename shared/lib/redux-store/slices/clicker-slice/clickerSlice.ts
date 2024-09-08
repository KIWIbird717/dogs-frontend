import { createSlice } from "@reduxjs/toolkit";

export namespace ClickerSlice {
  export type Type = {
    tapCoast: number;
  };

  const initialState: Type = {
    tapCoast: 1,
  };

  export const clickerSlice = createSlice({
    name: "clicker",
    initialState,
    reducers: {},
  });
}
