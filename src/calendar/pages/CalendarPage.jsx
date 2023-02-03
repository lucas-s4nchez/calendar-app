import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { getMessagesEs, localizer } from "../../helpers";
import { Navbar } from "../components/Navbar";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { CalendarModal } from "../components/CalendarModal";
import { useCalendarStore, useUiStore } from "../../hooks";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// const events = [
//   {
//     title: "nuevo evento",
//     nota: "probando react-big-calendar",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       id: "123abc",
//       name: "Lucas",
//     },
//   },
// ];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { handleOpenDateModal } = useUiStore();
  const { events, handleSetActiveEvent, startDeletingEvent } =
    useCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#262254",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };
  const onDoubleClickEventSelect = (event) => {
    handleOpenDateModal();
  };
  const onClickEventSelect = (event) => {
    handleSetActiveEvent(event);
  };
  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  const handleAddNewEvent = (e) => {
    handleSetActiveEvent({
      title: "",
      note: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        id: "123abc",
        name: "Lucas",
      },
    });
    handleOpenDateModal();
  };
  const handleDeleteEvent = () => {
    startDeletingEvent();
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClickEventSelect}
        onSelectEvent={onClickEventSelect}
        onView={onViewChange}
        components={{
          event: CalendarEventBox,
        }}
      />
      <CalendarModal />

      <Fab
        color="primary"
        aria-label="Añadir nuevo evento"
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
        }}
        onClick={handleAddNewEvent}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="error"
        aria-label="Eliminar evento"
        sx={{
          position: "fixed",
          left: 20,
          bottom: 20,
        }}
        onClick={handleDeleteEvent}
      >
        <DeleteIcon />
      </Fab>
    </>
  );
};
