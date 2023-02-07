import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthIcon />
            <Typography sx={{ fontSize: 25 }}>{user.name}</Typography>
          </Box>
          <Button
            endIcon={<LogoutIcon />}
            color="inherit"
            variant="outlined"
            onClick={startLogout}
          >
            Salir
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
