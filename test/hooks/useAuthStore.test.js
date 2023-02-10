import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { calendarApi } from "../../src/api";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authReducer, onLogout } from "../../src/store";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUser,
} from "../fixtures/authFixtures";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("debe de retornar los valores por defecto", () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe de realizar el login correctamente", async () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;

    await act(async () => {
      await startLogin(testUser);
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { name: testUser.name, uid: testUser.uid },
      status: "authenticated",
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar el login", async () => {
    //renderizar un hook que utiliza el store de redux
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;

    await act(async () => {
      await startLogin({ email: "algo@algo.com", password: "12345678" });
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: {
        email: "No existe un usuario con este email",
        password: "La contraseña es incorrecta",
      },
      user: {},
      status: "not-authenticated",
    });
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-init-date")).toBe(null);
  });

  test("startRegister debe de crear un usuario correctamente", async () => {
    const newUser = {
      name: "Mock User",
      email: "mockemail@gmail.com",
      password: "mockpassword",
    };
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    //evitar hacer la peticion post a la api
    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "mock-uid",
        name: "Mock User",
        token: "mock-token",
      },
    });
    const { startRegister } = result.current;

    await act(async () => {
      await startRegister(newUser);
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { name: "Mock User", uid: "mock-uid" },
      status: "authenticated",
    });
    expect(localStorage.getItem("token")).toBe("mock-token");
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));

    spy.mockRestore();
  });

  test("startRegister debe de fallar al crear un usuario", async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startRegister } = result.current;

    await act(async () => {
      await startRegister(testUser);
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: {
        email: "Email ya se encuentra registrado",
        name: undefined,
        password: undefined,
      },
      status: "not-authenticated",
      user: {},
    });
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-init-date")).toBe(null);
  });

  test("checkAuthToken debe de fallar si no hay un token", async () => {
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de autenticar un usuario si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUser);
    localStorage.setItem("token", data.token);
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: testUser.name, uid: testUser.uid },
    });
  });

  test("startLogout debe de hacer el logout correctamente", async () => {
    const dispatch = jest.fn();
    const mockStore = getMockStore(authenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startLogout } = result.current;

    await act(async () => {
      await startLogout();
    });

    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });
});
