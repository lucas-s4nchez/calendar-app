import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent } from "../store";

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
    } else {
      //Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    //*Propiedads
    events,
    activeEvent,

    //*Métodos
    handleSetActiveEvent,
    startSavingEvent,
  };
};
