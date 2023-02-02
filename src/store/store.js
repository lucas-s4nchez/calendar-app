import { configureStore } from "@reduxjs/toolkit";
import { calendarReducer } from "./calendar";
import { uiReducer } from "./ui";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
  },
});
