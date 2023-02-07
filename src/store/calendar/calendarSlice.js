import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  calendarErrorMessage: undefined,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent !== null) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
      state.calendarErrorMessage = undefined;
    },
    // onAlertMessage: (state, { payload }) => {
    //   state.calendarErrorMessage = payload;
    // },
    // clearAlertMessage: (state) => {
    //   state.calendarErrorMessage = undefined;
    // },
  },
});

export const {
  onLoadEvents,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLogoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
