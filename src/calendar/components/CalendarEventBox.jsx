import { Typography } from "@mui/material";

export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <Typography
        sx={{
          textTransform: "capitalize",
          fontFamily: "cursive",
          textAlign: "end",
        }}
      >
        {user.name}
      </Typography>
    </>
  );
};
