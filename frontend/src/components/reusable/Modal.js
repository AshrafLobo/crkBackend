import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

function Modal({ title, body, open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullScreen={fullScreen}
    >
      <DialogTitle id="dialog-title" p={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="div">{title}</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  );
}

export default Modal;
