import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useUiStore } from "../../hooks";

export const RegisterPage = () => {
  const { errorMessage, startRegister } = useAuthStore();
  const { isVisiblePassword, handlePasswordVisibility } = useUiStore();
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Campo requerido")
        .min(3, "Mínimo 3 caracteres"),
      email: Yup.string()
        .required("Campo requerido")
        .email("Correo electronico invalido"),
      password: Yup.string()
        .required("Campo requerido")
        .min(6, "Minimo 6 caracteres"),
    }),
    onSubmit: (values) => {
      startRegister(values);
    },
  });

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit} data-testid="register-form">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre"
              fullWidth
              name="name"
              {...getFieldProps("name")}
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: !!errorMessage?.name ? "" : "none",
                marginBlock: 2,
              }}
            >
              <Alert severity="error">{errorMessage?.name}</Alert>
            </Box>
          </Grid>
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
            <Box
              sx={{
                display: !!errorMessage?.email ? "" : "none",
                marginBlock: 2,
              }}
            >
              <Alert severity="error">{errorMessage?.email}</Alert>
            </Box>
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
            <Box
              sx={{
                display: !!errorMessage?.password ? "" : "none",
                marginBlock: 2,
              }}
            >
              <Alert severity="error">{errorMessage?.password}</Alert>
            </Box>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                // disabled={isCheckingAuthentication}
              >
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to={"/auth/login"}>
              ingresa
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
