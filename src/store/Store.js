import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer.js";
import { persistStore } from "redux-persist";
import { reduxBatch } from "@manaflair/redux-batch";
import logger from "redux-logger";

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),

  logger,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: "production",
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);
export default store;
