import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameSliceTypes } from "./types";
import { GameServiceTypes } from "@/shared/lib/services/game/types";

export namespace GameSlice {
  export type Type = {
    levels: GameServiceTypes.GetLevelsResponse | null;
    leagues: GameServiceTypes.GetLeaguesResponse | null;
  };

  const initialState: Type = {
    levels: null,
    leagues: null,
  };

  export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
      setLevels: (state, action: PayloadAction<Type["levels"]>) => {
        state.levels = action.payload;
      },
      setLeagues: (state, action: PayloadAction<Type["leagues"]>) => {
        state.leagues = action.payload;
      },
    },
  });

  export const { setLevels, setLeagues } = gameSlice.actions;
  export const gameReducer = gameSlice.reducer;
}
