import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// 🎨 Styled MUI button (override defaults)
const StyledButton = styled(Button)(({ theme }) => ({
  width: "40%",
  fontWeight: 500,
  padding: "12px 24px",
  borderRadius: "4px",
  fontSize: "16px",
  fontFamily: "inherit",
  marginTop: "8px",
  textTransform: "none", // removes ALL CAPS
  transition: "background-color 0.2s ease",

  "&.back": {
    backgroundColor: "#555",
    color: "#fff",
    "&:hover": { backgroundColor: "#666" },
  },
  "&.next": {
    backgroundColor: "#007bff",
    color: "#fff",
    marginLeft: "auto",
    "&:hover": { backgroundColor: "#0062cc" },
  },
  "&.submit": {
    backgroundColor: "#28a745",
    color: "#fff",
    marginLeft: "auto",
    "&:hover": { backgroundColor: "#218838" },
  },
}));

// 🔄 Reusable wrapper
export default function AppButton({ children, variant, onClick, type = "button", ...rest }) {
  return (
    <StyledButton
      className={variant} // "back" | "next" | "submit"
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
