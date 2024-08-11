import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetMeUserType } from "@/shared/hooks/useUser";

export namespace StatsSlice {
  export type IStatsSlice = {
    dailyUsers: GetMeUserType[];
    online: GetMeUserType[];
  };

  const initialState: IStatsSlice = {
    dailyUsers: [],
    online: [],
  };

  export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
      setAllUserStats: (state, action: PayloadAction<IStatsSlice>) => {
        state.online = action.payload.online;
        state.dailyUsers = action.payload.dailyUsers;
      },
    },
  });

  export const { setAllUserStats } = statsSlice.actions;
  export const userReducer = statsSlice.reducer;
  export type Type = IStatsSlice;
}
