import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { loginUser } from "../services/authService";
import { loginSuccess } from "../redux/userSlice.js";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email().required("email id is required"),
    password: Yup.string()
      .min(6, "minimum 6 characters reqired")
      .required("password is required"),
  });

  const onLogin = (values) => {
    // Call loginUser from authService
    try {
      const user = loginUser(values);
      console.log(user);
      dispatch(loginSuccess(user));
      toast.success("Login successfull");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const handleNavigateToRegister = () => {
    navigate("/register");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper sx={{ padding: 3, width: "30%" }}>
        <Typography align="center" variant="h4">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onLogin}
        >
          {({ handleSubmit }) => (
            <Form>
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />
              <Button type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          onClick={handleNavigateToRegister}
          align="center"
          sx={{
            cursor: "pointer",
            marginTop: "16px",
            textDecoration: "underline",
          }}
        >
          Don't have an account? Register
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
