import { CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRoutes = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
      >
        <Grid container direction="row" justifyContent="center">
          <CircularProgress color="warning" />
        </Grid>
      </Grid>
    );
  }
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
