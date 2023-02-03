import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const initialState = {
  events: [
    {
      _id: new Date().getTime(),
      title: "nuevo evento",
      note: "probando react-big-calendar",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        id: "123abc",
        name: "Lucas",
      },
    },
  ],
  activeEvent: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    loadEvents: (state, { payload }) => {
      state.events = payload;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { loadEvents, onSetActiveEvent, onAddNewEvent } =
  calendarSlice.actions;

export default calendarSlice.reducer;
