import {
  onChangePasswordVisibility,
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";
import { initialState } from "../../fixtures/uiFixtures";

describe("Pruebas en el uiSlice.js", () => {
  test("debe de retornar el estado inicial", () => {
    const state = uiSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("debe de cambiar el isDateModalOpen correctamente", () => {
    const state = uiSlice.getInitialState();

    let newState = uiSlice.reducer(state, onOpenDateModal());
    expect(newState.isDateModalOpen).toBeTruthy();

    newState = uiSlice.reducer(newState, onCloseDateModal());
    expect(newState.isDateModalOpen).toBeFalsy();
  });

  test("debe de cambiar el isVisiblePassword correctamente", () => {
    const state = uiSlice.getInitialState();

    let newState = uiSlice.reducer(state, onChangePasswordVisibility());
    expect(newState.isVisiblePassword).toBeTruthy();

    newState = uiSlice.reducer(newState, onChangePasswordVisibility());
    expect(newState.isVisiblePassword).toBeFalsy();
  });
});
