import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
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
  DesktopDateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";

export const CalendarModal = () => {
  const [open, setOpen] = useState(true);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      note: "",
    },

    onSubmit: (values) => {
      if (!startValue || !endValue || !values.title || !values.note) {
        setAlertMessage("Por favor, completa todos los campos del formulario");
        return;
      }
      if (startValue > endValue) {
        setAlertMessage(
          "La fecha de finalizacion del evento debe ser mayor a la fecha de inicio del mismo"
        );
        return;
      }

      setAlertMessage("");

      const newNote = {
        title: values.title,
        nota: values.note,
        start: startValue,
        end: endValue,
      };

      console.log(newNote);
    },
  });

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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={esEs}
          >
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
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={false}
                      helperText="* Selecciona la fecha de inicio del evento"
                    />
                  )}
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
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={false}
                      helperText="* Selecciona la fecha de inicio del evento"
                    />
                  )}
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
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={false}
                      helperText="* Selecciona la fecha de finalización del evento"
                    />
                  )}
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
                      {...params}
                      error={false}
                      helperText="* Selecciona la fecha de finalización del evento"
                    />
                  )}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          <TextField
            label="Título"
            type="text"
            fullWidth
            {...getFieldProps("title")}
            helperText="* Título del evento"
          />
          <TextField
            label="Nota"
            type="text"
            fullWidth
            {...getFieldProps("note")}
            helperText="* Información adicional sobre el evento"
          />
          {!!alertMessage && <Alert severity="error">{alertMessage}</Alert>}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
