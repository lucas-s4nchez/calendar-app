import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esEs from "date-fns/locale/es";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";

export const CalendarModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    start: "",
    end: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const { isDateModalOpen, handleCloseDateModal } = useUiStore();
  const { activeEvent, hasEventSelected, startSavingEvent } =
    useCalendarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (activeEvent !== null) {
      setFormData({ ...activeEvent });
    }
  }, [activeEvent]);

  const myEvent =
    user.uid === activeEvent?.user._id || user.uid === activeEvent?.user.uid;

  const handleSubmit = async (e) => {
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
    await startSavingEvent(formData);
    handleCloseDateModal();
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <Dialog open={isDateModalOpen} onClose={handleCloseDateModal}>
      <DialogTitle>Nuevo Evento</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingBlock: 2,
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={esEs}
          >
            <Box>
              <Box>
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
            </Box>
            <Box>
              <Box>
                <MobileDateTimePicker
                  minDateTime={
                    formData.start !== "" ? formData.start : new Date()
                  }
                  label="Fecha y hora de finalizaci??n"
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
                      helperText="* Selecciona la fecha de finalizaci??n del evento"
                    />
                  )}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          <TextField
            label="T??tulo"
            type="text"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            helperText="* T??tulo del evento"
          />
          <TextField
            label="Nota"
            type="text"
            fullWidth
            name="note"
            value={formData.note}
            onChange={handleChange}
            helperText="* Informaci??n adicional sobre el evento"
          />
          {!!alertMessage && (
            <Alert severity="error" variant="filled">
              {alertMessage}
            </Alert>
          )}
          <DialogActions>
            <Button
              onClick={handleCloseDateModal}
              variant="outlined"
              endIcon={<DoDisturbIcon />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!myEvent}
              endIcon={hasEventSelected ? <SaveAsIcon /> : <SaveIcon />}
            >
              {hasEventSelected ? "Modificar" : "Guardar"}
            </Button>
          </DialogActions>
          {!myEvent && (
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              No pod??s editar o eliminar una nota que no creaste
            </Alert>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
