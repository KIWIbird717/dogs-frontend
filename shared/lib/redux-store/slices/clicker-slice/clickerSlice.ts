import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export namespace ClickerSlice {
  export type Type = {
    energy: number;
    tapEnergyCoast: number;
    energyRecoverPerSecond: number;
  };

  const initialState: Type = {
    energy: 500,
    tapEnergyCoast: 1,
    energyRecoverPerSecond: 1,
  };

  export const clickerSlice = createSlice({
    name: "clicker",
    initialState,
    reducers: {
      takeEnergy: (state) => {
        state.energy -= state.tapEnergyCoast;
      },
      recoverEnergy: (state) => {
        state.energy += state.energyRecoverPerSecond;
      },
    },
  });

  export const { takeEnergy, recoverEnergy } = clickerSlice.actions;
  export const clickerReducer = clickerSlice.reducer;
}
