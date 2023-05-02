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
import { date } from "zod";

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
  const [weekDays, setWeekDays] = useState([
    { index: 1, day: "sunday", workDay: false },
    { index: 2, day: "monday", workDay: false },
    { index: 3, day: "tuesday", workDay: false },
    { index: 4, day: "wednesday", workDay: false },
    { index: 5, day: "thursday", workDay: false },
    { index: 6, day: "friday", workDay: false },
    { index: 7, day: "saturday", workDay: false },
  ]);
  //   const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();
  const scheduleMutation = trpc.scheduleRouter.initialSchdule.useMutation();

  //   const { getRootProps, onClickAway } = useSnackbar({
  //     autoHideDuration: 6000,
  //     open: isSnackbarOpen,
  //   });

  const handleCreateSchedule = () => {
    console.log("Create", { weekDays });
    const result = scheduleMutation.mutate([...weekDays]);
    console.log(result);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked, e.currentTarget.value);

    const idx = parseInt(e.currentTarget.value);
    const day = weekDays.filter((day) => day.index === idx);
    const newArray = weekDays.filter((day) => day.index !== idx);
    console.log(newArray);
    newArray.push({
      index: idx,
      day: day[0]?.day!,
      workDay: e.currentTarget.checked,
    });
    // const day = e.currentTarget.value;
    setWeekDays([...newArray]);
  };

  console.log(weekDays);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent className="max-h-[300px] w-full">
          {/* <DialogContentText>First Name</DialogContentText> */}
          <div className="flex items-center">
            {weekDays?.map((day) => {
              return (
                <div key={day.index}>
                  <Checkbox
                    key={day.index}
                    name={day.day.toUpperCase()}
                    value={day.index}
                    onChange={handleWeekChange}
                    // onClick={(e) => console.log(e.currentTarget)}
                  />
                  <label htmlFor={day.day}>{day.day.toUpperCase()}</label>
                </div>
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
