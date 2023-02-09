export const events = [
  {
    id: "1",
    start: new Date("2023-02-10 13:00:00"),
    end: new Date("2023-02-10 15:00:00"),
    title: "evento de test",
    note: "descripcion del evento de test",
  },
  {
    id: "2 ",
    start: new Date("2023-02-12 13:00:00"),
    end: new Date("2023-02-12 15:00:00"),
    title: "otro evento de test",
    note: "descripcion del otro evento de test",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  calendarErrorMessage: undefined,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
  calendarErrorMessage: undefined,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] },
  calendarErrorMessage: undefined,
};
