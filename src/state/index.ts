import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createMigrate, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import migrations from "./migrations";
import reducer from "./reducer";

// initial states here
const initialState = {};

const PERSISTED_KEYS = ["user", "transactions", "lists", "slippage", "presale"];

const persistConfig = {
  key: "root",
  whitelist: PERSISTED_KEYS,
  version: 4,
  storage,
  migrate: createMigrate(migrations, {
    debug: process.env.NODE_ENV === "development",
  }),
};

const persistedReducer = persistReducer(persistConfig, reducer);

// create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof persistedReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;