import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export namespace StatsSlice {
  export type Type = {
    dailyUsers: number;
    online: number;
    totalUsers: number;
    totalTouches: number | null;
  };

  const initialState: Type = {
    dailyUsers: 0,
    online: 0,
    totalUsers: 0,
    totalTouches: 0,
  };

  export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
      setAllUserStats: (state, action: PayloadAction<Type>) => {
        state.online = action.payload.online;
        state.dailyUsers = action.payload.dailyUsers;
        state.totalUsers = action.payload.totalUsers;
        state.totalTouches = action.payload.totalTouches;
      },
      updateOnlineUsers: (state, action: PayloadAction<Type["online"]>) => {
        state.online = action.payload;
      },
    },
  });

  export const { setAllUserStats, updateOnlineUsers } = statsSlice.actions;
  export const statsReducer = statsSlice.reducer;
}
