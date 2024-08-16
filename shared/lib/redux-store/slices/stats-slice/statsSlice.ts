import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetMeUserType } from "@/shared/hooks/useUser";

export namespace StatsSlice {
  export type IStatsSlice = {
    dailyUsers: number,
    online: number,
    totalUsers: number,
    totalTouches: number | null
  };

  const initialState: IStatsSlice = {
    dailyUsers: 0,
    online: 0,
    totalUsers: 0,
    totalTouches: 0
  };

  export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
      setAllUserStats: (state, action: PayloadAction<IStatsSlice>) => {
        state.online = action.payload.online
        state.dailyUsers = action.payload.dailyUsers
        state.totalUsers = action.payload.totalUsers
        state.totalTouches = action.payload.totalTouches
      },
    },
  });

  export const { setAllUserStats } = statsSlice.actions;
  export const statsReducer = statsSlice.reducer;
  export type Type = IStatsSlice;
}
