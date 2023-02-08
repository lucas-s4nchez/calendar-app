import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en calendarApi.js", () => {
  test("la baseURL debe ser la misma que la del archivo .env", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });
  test("debe de tener el x-token en el header de todas las peticiones", async () => {
    const token = "ABC-123";
    localStorage.setItem("token", token);
    //se ejecuta una peticion para comprobar que el token está en los headers
    const res = await calendarApi
      .get("/auth")
      .then((res) => res)
      .catch((res) => res);

    expect(res.config.headers["x-token"]).toBe(token);
  });
});
