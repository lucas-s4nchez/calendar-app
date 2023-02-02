import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import { store } from "./store";
import Theme from "./theme/Theme";

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <AppRoutes />
        </Theme>
      </BrowserRouter>
    </Provider>
  );
};

export default CalendarApp;
