import { TextField } from "@mui/material";
import { useField } from "formik";

const TextInput = ({ label, name, type }) => {
  const [field, meta] = useField(name);
  return (
    <TextField
      variant="outlined"
      {...field}
      margin="normal"
      label={label}
      type={type}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default TextInput;
