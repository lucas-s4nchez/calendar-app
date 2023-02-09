import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiReducer } from "../../src/store";
import { initialState } from "../fixtures/uiFixtures";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en el useUiStore", () => {
  test("debe de regresar los valores por defecto", () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      isVisiblePassword: false,
      handleOpenDateModal: expect.any(Function),
      handleCloseDateModal: expect.any(Function),
      handlePasswordVisibility: expect.any(Function),
    });
  });

  test("handleOpenDateModal debe de colocar true en el isDateModalOpen", () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { handleOpenDateModal } = result.current;

    act(() => {
      handleOpenDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("handleCloseDateModal debe de colocar false en el isDateModalOpen", () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { handleCloseDateModal, handleOpenDateModal } = result.current;

    act(() => {
      handleOpenDateModal(); //true
      handleCloseDateModal(); //false
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test("handlePasswordVisibility debe de cambiar a true o false el isVisiblePassword", () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { handlePasswordVisibility } = result.current;

    act(() => {
      handlePasswordVisibility(); //true
    });

    expect(result.current.isVisiblePassword).toBeTruthy();

    act(() => {
      handlePasswordVisibility(); //false
    });

    expect(result.current.isVisiblePassword).toBeFalsy();
  });
});
