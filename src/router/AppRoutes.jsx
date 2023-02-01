import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../calendar";

export const AppRoutes = () => {
  const status = "authenticated";
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<CalendarRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
