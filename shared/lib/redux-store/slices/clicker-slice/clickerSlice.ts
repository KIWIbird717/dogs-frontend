import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export namespace ClickerSlice {
  export type Type = {
    currentEnergy: number;
  };

  const initialState: Type = {
    currentEnergy: 0,
  };

  export const clickerSlice = createSlice({
    name: "clicker",
    initialState,
    reducers: {
      setCurrentEnergy: (state, action: PayloadAction<Type["currentEnergy"]>) => {
        state.currentEnergy = action.payload;
      },
    },
  });

  export const { setCurrentEnergy } = clickerSlice.actions;
  export const clickerReducer = clickerSlice.reducer;
}
