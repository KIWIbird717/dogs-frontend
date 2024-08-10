import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { ModalSlice } from "@/shared/lib/redux-store/slices/modal-slice/modalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, UserSlice.userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    modal: ModalSlice.modalReducer,
    stats: StatsSlice.statsReducer,
  },
  /**
   * You cant set up more middlewares
   * Check instruction: @see https://redux-toolkit.js.org/api/serializabilityMiddleware
   */
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
