import { Button as MuiButtons } from "@mui/material";

const Button = ({ children, color = "Primary", onClick, isDisabled }) => {
  return (
    <MuiButtons
      variant="contained"
      //   color={color}
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        marginTop: "16px",
        width: "100%",
        height: "48px",
      }}
      disableElevation
    >
      {children}
    </MuiButtons>
  );
};

export default Button;
