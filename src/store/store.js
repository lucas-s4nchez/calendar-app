import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { calendarReducer } from "./calendar";
import { uiReducer } from "./ui";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
