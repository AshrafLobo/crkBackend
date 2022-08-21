import React from "react";
import { Alert, Snackbar } from "@mui/material";

function Toast({ open, handleClose, severity, children }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
