import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esEs from "date-fns/locale/es";
import {
  DateTimePicker,
  DesktopDateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";

import { format } from "date-fns";

export const CalendarModal = () => {
  const [open, setOpen] = useState(true);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    validationSchema: Yup.object({
      start: Yup.number()
        .required("Campo requerido")
        .min(new Date(), "Fecha inválida"),
      end: Yup.number()
        .min(new Date(), "Fecha inválida")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esEs}>
          <Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <MobileDateTimePicker
                minDateTime={new Date()}
                label="Fecha y hora de inicio"
                value={startValue}
                onChange={(newValue) => {
                  setStartValue(newValue);
                }}
                fullWidth
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <DesktopDateTimePicker
                minDateTime={new Date()}
                label="Fecha y hora de inicio"
                value={startValue}
                onChange={(newValue) => {
                  setStartValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <MobileDateTimePicker
                minDateTime={startValue !== "" ? startValue : new Date()}
                label="Fecha y hora de finalización"
                value={endValue}
                onChange={(newValue) => {
                  setEndValue(newValue);
                }}
                fullWidth
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <DesktopDateTimePicker
                minDateTime={startValue !== "" ? startValue : new Date()}
                label="Fecha y hora de finalización"
                value={endValue}
                onChange={(newValue) => {
                  setEndValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    error={endValue < startValue}
                    helperText="cambia la fecha pibe"
                    {...params}
                  />
                )}
              />
            </Box>
          </Box>
        </LocalizationProvider>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
