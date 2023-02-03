import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleSetActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend

    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //*Propiedads
    events,
    activeEvent,
    hasEventSelected: !!activeEvent?._id,

    //*Métodos
    handleSetActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
