import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore, useUiStore } from "../../src/hooks";
import { AppRoutes } from "../../src/router/AppRoutes";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/hooks/useUiStore");
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe("Pruebas en AppRoutes", () => {
  const mockCheckAuthToken = jest.fn();
  const mockHandlePasswordVisibility = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("debe de llamar la pantalla de carga y el checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "checking",
    });
    render(<AppRoutes />);

    expect(screen.getByTestId("circular-progress")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe de mostrar la pagina del login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "not-authenticated",
    });
    useUiStore.mockReturnValue({
      isVisiblePassword: false,
      handlePasswordVisibility: mockHandlePasswordVisibility,
    });
    const { container } = render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getAllByText("Iniciar sesion").length).toBe(2);
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar la pagina del calendario en caso de estar autenticado", () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "authenticated",
    });
    const { container } = render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Calendar Page")).toBeTruthy();
  });
});
