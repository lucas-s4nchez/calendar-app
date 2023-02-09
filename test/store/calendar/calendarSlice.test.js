import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarFixtures";

describe("Pruebas en calendarSlice", () => {
  test("debe de retornar el estado inicial", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("onLoadEvents debe cargar los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();
  });

  test("onSetActiveEvent debe activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe de agregar un nuevo evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-02-15 13:00:00"),
      end: new Date("2023-02-15 15:00:00"),
      title: "nuevo evento de test",
      note: "descripcion del nuevo evento de test",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([
      ...calendarWithActiveEventState.events,
      newEvent,
    ]);
  });

  test("onUpdateEvent debe de actualizar un evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2023-02-16 13:00:00"),
      end: new Date("2023-02-16 15:00:00"),
      title: "evento actualizado de test",
      note: "descripcion del evento actualizado de test",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debe de eliminar un evento", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events.length).toBe(1);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLogoutCalendar debe de limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLogoutCalendar()
    );

    expect(state).toEqual(initialState);
  });
});
