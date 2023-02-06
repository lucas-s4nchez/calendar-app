import { useDispatch, useSelector } from "react-redux";
import {
  onChangePasswordVisibility,
  onCloseDateModal,
  onOpenDateModal,
} from "../store";

export const useUiStore = () => {
  const { isDateModalOpen, isVisiblePassword } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  const handleOpenDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const handleCloseDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const handlePasswordVisibility = () => {
    dispatch(onChangePasswordVisibility());
  };

  return {
    //*Propiedades
    isDateModalOpen,
    isVisiblePassword,

    //*Métodos
    handleOpenDateModal,
    handleCloseDateModal,
    handlePasswordVisibility,
  };
};
