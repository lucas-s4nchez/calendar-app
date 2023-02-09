import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  testUser,
} from "../../fixtures/authFixtures";

describe("Pruebas en authSlice", () => {
  test("debe de retornar el estado inicial", () => {
    const state = authSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("debe de chequear el status de autenticacion", () => {
    const state = authSlice.reducer(authenticatedState, onChecking());

    expect(state).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de hacer el login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUser));
    expect(state).toEqual({
      status: "authenticated",
      user: { ...testUser },
      errorMessage: undefined,
    });
  });

  test("debe de hacer el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de hacer el logout con mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("debe de limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });
});
