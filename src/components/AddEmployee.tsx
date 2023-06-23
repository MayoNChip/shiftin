import React, { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { useSnackbar, ClickAwayListener } from "@mui/base";
import { Checkbox, FormControlLabel, Snackbar, TextField } from "@mui/material";

interface newUserType {
  firstName: string;
  lastName: string;
  roleId: number;
}

function AddEmployee() {
  const [newUserDetails, setNewUserDetails] = React.useState<newUserType>({
    firstName: "",
    lastName: "",
    roleId: 1,
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();

  const { getRootProps, onClickAway } = useSnackbar({
    autoHideDuration: 6000,
    open: isSnackbarOpen,
  });

  const handleFirstNameChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.target.value);
    setNewUserDetails({ ...newUserDetails, firstName: e.target.value });
  };
  const handleLastNameChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.target.value);
    setNewUserDetails({ ...newUserDetails, lastName: e.target.value });
  };

  const handleRoleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(e.target.value);
    setNewUserDetails({ ...newUserDetails, roleId: parseInt(e.target.value) });
  };

  const handleCreateEmployee = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      !newUserDetails.roleId ||
      !newUserDetails.firstName ||
      !newUserDetails.lastName
    )
      return;
    employeeMutation.mutate(
      { ...newUserDetails },
      {
        onSuccess(input) {
          trpc;
        },
      }
    );
    setIsSnackbarOpen(true);

    employeeMutation.isSuccess && handleClose();
  };

  return (
    <div>
      {/* <DialogContentText>First Name</DialogContentText> */}
      <TextField
        autoFocus
        margin="dense"
        id="firstName"
        label="First Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => handleFirstNameChange(e)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="lastName"
        label="Last Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => handleLastNameChange(e)}
      />
      {/* <TextField
            autoFocus
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleRoleChange(e)}
          /> */}
      <FormControlLabel
        control={
          <Checkbox
            // checked={day.active}
            name="waiter"
            value="1"
            onChange={(e) => handleRoleChange(e)}
          />
        }
        label="Waiter"
      />
      <ClickAwayListener onClickAway={onClickAway}>
        <Snackbar {...getRootProps()}>
          <div>Hello</div>
        </Snackbar>
      </ClickAwayListener>
    </div>
  );
}

export default AddEmployee;
