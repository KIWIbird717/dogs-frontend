import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      user: UserSlice.userReducer,
    },
    /**
     * You cant set up more middlewares
     * Check instruction: @see https://redux-toolkit.js.org/api/serializabilityMiddleware
     */
    middleware: (gDM) => gDM({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
