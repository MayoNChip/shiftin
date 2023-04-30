import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  ClickAwayListener,
  Checkbox,
} from "@mui/material";
import { useSnackbar } from "@mui/base";
import { ChangeEvent, useState } from "react";
import React from "react";
import { trpc } from "../utils/trpc";
import MySnackbar from "./MySnackbar";
import { TRPCClient } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface newUserType {
  firstName: string;
  lastName: string;
}

interface WeekDaysType {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wendesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

function CreateNewScheduleModal({ isOpen, setIsModalOpen }: Props) {
  const [weekDays, setWeekDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wendesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  //   const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();

  //   const { getRootProps, onClickAway } = useSnackbar({
  //     autoHideDuration: 6000,
  //     open: isSnackbarOpen,
  //   });

  const handleCreateSchedule = () => {
    console.log("Create", { weekDays });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
    const day = e.currentTarget.value;
    setWeekDays({ ...weekDays, [day]: e.currentTarget.checked });
  };

  console.log(weekDays);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent className="max-h-[300px] w-full">
          {/* <DialogContentText>First Name</DialogContentText> */}
          <div className="flex items-center">
            {Object.keys(weekDays).map((day) => {
              return (
                <>
                  <Checkbox
                    name={day.toUpperCase()}
                    value={day}
                    onChange={handleWeekChange}
                    // onClick={(e) => console.log(e.currentTarget)}
                  />
                  <label htmlFor={day}>{day.toUpperCase()}</label>
                </>
              );
            })}
          </div>

          {/* <ClickAwayListener onClickAway={onClickAway}>
            <Snackbar {...getRootProps()}>
              <div>Hello</div>
            </Snackbar>
          </ClickAwayListener> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateSchedule}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateNewScheduleModal;
