import React, { useState } from "react";

import { Button, IconButton, Snackbar } from "@mui/material";

interface Props {
  message: string;
  duration: number;
  type?: "success" | "failure" | "warning";
  isOpen: boolean;
}

function MySnackbar({ message, duration, type, isOpen }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = <React.Fragment></React.Fragment>;

  return (
    <>
      {isOpen && (
        <Snackbar
          open={isOpen}
          autoHideDuration={duration}
          onClose={handleClose}
          message={message}
          action={action}
        />
      )}
    </>
  );
}

export default MySnackbar;
