import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    email: Yup.string().email().required("email id is required"),
    password: Yup.string()
      .min(6, "minimum 6 characters reqired")
      .required("password is required"),
  });
  const handleNavigateToLogin = () => {
    navigate("/");
  };

  const onRegister = (values) => {
    try {
      // Call registerUser from authService
      const user = registerUser(values);
      console.log(user);
      toast.success("Registration successful");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    }
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
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onRegister}
        >
          {({ handleSubmit }) => (
            <Form>
              <TextInput label="User name" name="username" type="string" />
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />
              <Button type="submit" onClick={handleSubmit}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          onClick={handleNavigateToLogin}
          align="center"
          sx={{
            cursor: "pointer",
            marginTop: "16px",
            textDecoration: "underline",
          }}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
