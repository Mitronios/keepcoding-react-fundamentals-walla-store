import { configureStore } from "@reduxjs/toolkit";
import * as authSlice from "./slices/authSlice";
import * as advertsSlice from "./slices/advertsSlice";
import * as tagsSlice from "./slices/tagsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.default,
    adverts: advertsSlice.default,
    tags: tagsSlice.default,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/REHYDRATE"],
        ignoredPaths: ["auth.token"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
