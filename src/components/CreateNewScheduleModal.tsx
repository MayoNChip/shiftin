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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  SelectChangeEvent,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useSnackbar } from "@mui/base";
import { ChangeEvent, MouseEvent, ReactNode, useState } from "react";
import React from "react";
import { trpc } from "../utils/trpc";
import MySnackbar from "./MySnackbar";
import { TRPCClient } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";
import { TypeOf, boolean, date } from "zod";

interface Props {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const weekFormData = {
  monthWeek: { week: 0, month: "january" },
  weekWorkDays: [
    {
      index: 0,
      day: "sunday",
      workDay: false,
    },
    {
      index: 1,
      day: "monday",
      workDay: false,
    },
    {
      index: 2,
      day: "tuesday",
      workDay: false,
    },
    {
      index: 3,
      day: "wednesday",
      workDay: false,
    },
    {
      index: 4,
      day: "thursday",
      workDay: false,
    },
    {
      index: 5,
      day: "friday",
      workDay: false,
    },
    {
      index: 6,
      day: "saturday",
      workDay: false,
    },
  ],
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type WeekFormType = typeof weekFormData | null;

function CreateNewScheduleModal({ isOpen, setIsModalOpen }: Props) {
  const [weekDays, setWeekDays] = useState<WeekFormType>(weekFormData);

  const [defineShiftsModalOpen, setDefineShiftsModalOpen] = useState(false);
  //   const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const employeeMutation = trpc.employeeRouter.addEmployee.useMutation();
  const scheduleMutation = trpc.scheduleRouter.initialSchdule.useMutation();
  const workDays = trpc.scheduleRouter.getWorkingDays.useQuery();

  //   const { getRootProps, onClickAway } = useSnackbar({
  //     autoHideDuration: 6000,
  //     open: isSnackbarOpen,
  //   });

  const handleCreateSchedule = () => {
    if (!weekDays?.weekWorkDays) {
      return;
    }
    console.log("Create", { weekDays });
    const weekDaysArray = weekDays.weekWorkDays.map((workDay) => {
      return { active: workDay.workDay, day: workDay.day };
    });
    const result = scheduleMutation.mutate(weekDaysArray);
    console.log(result);
    //reset
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!weekDays?.weekWorkDays) {
      return;
    }
    const idx = parseInt(e.currentTarget.value);
    const day = weekDays?.weekWorkDays.filter((day) => day.index === idx)[0];
    const workDaysArray = [...weekDays.weekWorkDays];
    const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
    if (day) {
      dayToUpdate[0] = { ...day, workDay: e.currentTarget.checked };
      workDaysArray[idx] = dayToUpdate[0];
    }
    setWeekDays({ ...weekDays, weekWorkDays: [...workDaysArray] });
  };

  const handleWeekNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!weekDays?.weekWorkDays || !weekDays?.monthWeek) {
      return;
    }
    if (parseInt(e.target.value) >= 6) {
      e.target.value = "6";
    }
    if (parseInt(e.target.value) <= 0) {
      e.target.value = "1";
    }
    console.info(e.target.value);
    setWeekDays({
      monthWeek: { ...weekDays.monthWeek, week: parseInt(e.target.value) },
      weekWorkDays: [...weekDays.weekWorkDays],
    });
  };

  console.log(weekDays);

  const handleMonthChange = (e: SelectChangeEvent<string>) => {
    if (!weekDays?.weekWorkDays || !weekDays?.monthWeek) {
      return;
    }
    setWeekDays({
      monthWeek: { ...weekDays.monthWeek, month: e.target.value },
      weekWorkDays: [...weekDays.weekWorkDays],
    });
  };

  const openDefineShiftsModal = (idx: number) => {
    setDefineShiftsModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
        <DialogTitle>New Schedule</DialogTitle>
        <DialogContent className="flex min-h-[300px] min-w-[550px] flex-col">
          {/* <DialogContentText>First Name</DialogContentText> */}
          <FormGroup className="my-4 flex w-[550px] gap-4">
            <FormControl size="small" className="flex w-full">
              <InputLabel id="demo-select-small">Month</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={weekDays?.monthWeek.month || "january"}
                label="Month"
                className="w-fit"
                onChange={handleMonthChange}
              >
                {months.map((month) => {
                  return (
                    <MenuItem value={month.toLocaleLowerCase()}>
                      {month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl size="small" className="w-fit">
              <TextField
                id="outlined-size-small"
                label="Week"
                variant="outlined"
                size="small"
                type="number"
                className="w-[100px]"
                // onKeyUp={handleWeekNumberChange}
                onChange={handleWeekNumberChange}
              />
            </FormControl>
          </FormGroup>

          {/* <FormControl size="small" className=" gap-4"> */}
          {/* <InputLabel id="demo-select-small">Week</InputLabel> */}

          {/* </FormControl> */}

          <h1 className="font-bold">Work Days</h1>
          <div className="flex w-[50%] flex-col">
            {weekDays?.weekWorkDays.map((day) => {
              return (
                <div
                  className="flex w-full flex-col items-center"
                  key={day.day}
                >
                  <div className="flex w-full items-center">
                    {/* <Checkbox
                        checked={day.workDay}
                        name={day.day.toUpperCase()}
                        value={day.index}
                        onChange={handleWeekChange}
                        
                      /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={day.workDay}
                          name={day.day.toUpperCase()}
                          value={day.index}
                          onChange={handleWeekChange}
                        />
                      }
                      label={day.day.toUpperCase()}
                    />
                    {day.workDay && (
                      <Button onClick={() => openDefineShiftsModal(day.index)}>
                        DEFINE SHIFTS
                      </Button>
                    )}
                    {/* <label htmlFor={day.day}>{day.day.toUpperCase()}</label> */}
                  </div>
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
