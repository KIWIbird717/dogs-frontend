"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { ModalSlice } from "@/shared/lib/redux-store/slices/modal-slice/modalSlice";
import { StatsSlice } from "@/shared/lib/redux-store/slices/stats-slice/statsSlice";
import { GameSlice } from "./slices/game-slice/gameSlice";

export const store = configureStore({
  reducer: combineReducers({
    user: UserSlice.userReducer,
    modal: ModalSlice.modalReducer,
    stats: StatsSlice.statsReducer,
    game: GameSlice.gameReducer,
  }),
  /**
   * You cant set up more middlewares
   * Check instruction: @see https://redux-toolkit.js.org/api/serializabilityMiddleware
   */
  middleware: (gDM) => gDM(),
  devTools: Boolean(parseInt(process.env.NEXT_PUBLIC_IS_DEBUG || "0")),
});

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
