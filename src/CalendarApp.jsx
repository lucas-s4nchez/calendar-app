import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import Theme from "./theme/Theme";

const CalendarApp = () => {
  return (
    <BrowserRouter>
      <Theme>
        <AppRoutes />
      </Theme>
    </BrowserRouter>
  );
};

export default CalendarApp;
