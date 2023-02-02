import { useEffect, useState } from "react";
import { useFormik } from "formik";
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
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    start: "",
    end: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const { isDateModalOpen, handleCloseDateModal } = useUiStore();
  const { activeEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent !== null) {
      setFormData({ ...activeEvent });
    }
  }, [activeEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.start || !formData.end || !formData.title || !formData.note) {
      setAlertMessage("Por favor, completa todos los campos del formulario");
      return;
    }
    if (formData.start > formData.end) {
      setAlertMessage(
        "La fecha de finalizacion del evento debe ser mayor a la fecha de inicio del mismo"
      );
      return;
    }

    setAlertMessage("");

    const newNote = {
      title: formData.title,
      nota: formData.note,
      start: formData.start,
      end: formData.end,
    };

    console.log(newNote);
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <Dialog open={isDateModalOpen} onClose={handleCloseDateModal}>
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
                  value={formData.start}
                  onChange={(newValue) => {
                    setFormData({ ...formData, start: newValue });
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
                  value={formData.start}
                  onChange={(newValue) => {
                    setFormData({ ...formData, start: newValue });
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
                  minDateTime={
                    formData.end !== "" ? formData.start : new Date()
                  }
                  label="Fecha y hora de finalización"
                  value={formData.end}
                  onChange={(newValue) => {
                    setFormData({ ...formData, end: newValue });
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
                  minDateTime={
                    formData.end !== "" ? formData.start : new Date()
                  }
                  label="Fecha y hora de finalización"
                  value={formData.end}
                  onChange={(newValue) => {
                    setFormData({ ...formData, end: newValue });
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            helperText="* Título del evento"
          />
          <TextField
            label="Nota"
            type="text"
            fullWidth
            name="note"
            value={formData.note}
            onChange={handleChange}
            helperText="* Información adicional sobre el evento"
          />
          {!!alertMessage && (
            <Alert severity="error" variant="filled">
              {alertMessage}
            </Alert>
          )}
          <DialogActions>
            <Button onClick={handleCloseDateModal}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
