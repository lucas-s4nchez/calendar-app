import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDateModalOpen: false,
  isVisiblePassword: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onChangePasswordVisibility: (state) => {
      state.isVisiblePassword = !state.isVisiblePassword;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal, onChangePasswordVisibility } =
  uiSlice.actions;

export default uiSlice.reducer;
