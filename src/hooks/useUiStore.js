import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleOpenDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const handleCloseDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //*Propiedades
    isDateModalOpen,

    //*Métodos
    handleOpenDateModal,
    handleCloseDateModal,
  };
};
