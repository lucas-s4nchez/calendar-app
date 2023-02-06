import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { AuthLayout } from "../layout/AuthLayout";
import { useUiStore } from "../../hooks";

export const LoginPage = () => {
  const { isVisiblePassword, handlePasswordVisibility } = useUiStore();
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Campo requerido")
        .email("Correo electronico invalido"),
      password: Yup.string()
        .required("Campo requerido")
        .min(6, "Minimo 6 caracteres"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <AuthLayout title="Iniciar sesion">
      <form onSubmit={handleSubmit} data-testid="login-form">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              {...getFieldProps("email")}
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Contraseña"
              fullWidth
              name="password"
              {...getFieldProps("password")}
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {isVisiblePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                // disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                <Typography>Iniciar sesion</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿No tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to={"/auth/register"}>
              registrarse
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
