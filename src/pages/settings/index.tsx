import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { TRPCClientError } from "@trpc/client";
import { WorkDay } from "@prisma/client";

const weekFormData = {
  monthWeek: { week: 0, month: "january" },
  weekWorkDays: [
    {
      id: 1,
      day: "sunday",
      active: false,
    },
    {
      id: 2,
      day: "monday",
      active: false,
    },
    {
      id: 3,
      day: "tuesday",
      active: false,
    },
    {
      id: 4,
      day: "wednesday",
      active: false,
    },
    {
      id: 5,
      day: "thursday",
      active: false,
    },
    {
      id: 6,
      day: "friday",
      active: false,
    },
    {
      id: 7,
      day: "saturday",
      active: false,
    },
  ],
};

// type WeekFormType = typeof weekFormData | null;
type WeekFormType = {
  monthWeek: { week: number; month: string };
  weekWorkDays: Partial<WorkDay>[];
};

function index() {
  const workDays = trpc.scheduleRouter.getWorkingDays.useQuery();
  const [weekDays, setWeekDays] = useState<WorkDay[]>(
    weekFormData.weekWorkDays
  );
  const [shiftType, setShiftType] = useState<{
    shiftName: string;
    startTime: string;
    endTime: string;
  }>({ shiftName: "", startTime: "", endTime: "" });
  const shiftsTypes = trpc.scheduleRouter.getAllShiftTypes.useQuery();
  const addShiftType = trpc.scheduleRouter.createShiftType.useMutation();
  const scheduleMutation = trpc.scheduleRouter.initialSchdule.useMutation();

  if (!workDays.data) {
    return <>Not good</>;
  }

  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!weekDays) {
      return;
    }
    const idx = parseInt(e.currentTarget.value);
    const day = weekDays.filter((day, index) => index === idx)[0];
    const workDaysArray = [...weekDays];
    const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
    if (day) {
      dayToUpdate[0] = { ...day, active: e.currentTarget.checked };
      workDaysArray[idx] = dayToUpdate[0];
    }
    console.log(workDaysArray);
    setWeekDays([...workDaysArray]);
  };

  const handleAddShiftType = async () => {
    const endTime = new Date(shiftType?.endTime);
    console.log(endTime);
    const startTime = new Date(shiftType?.startTime);
    console.log(startTime);

    await addShiftType.mutateAsync({
      startTime: startTime,
      endTime: endTime,
      shiftName: shiftType.shiftName,
    });

    if (addShiftType.isError) {
      throw new TRPCClientError("something went wrong");
    }
  };

  const handleShiftNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newShift = { ...shiftType, shiftName: e.target.value };
    setShiftType(newShift);
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newShift = { ...shiftType, startTime: e.target.value };
    setShiftType(newShift);
  };
  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newShift = { ...shiftType, endTime: e.target.value };
    setShiftType(newShift);
  };

  const handleCreateSchedule = () => {
    if (weekDays.length < 0) {
      return;
    }
    // console.log("Create", { weekDays });
    const result = scheduleMutation.mutate(weekDays);
    // console.log(result);
  };

  console.log(weekDays);

  return (
    <div className="m-auto mt-6 w-[800px] rounded-md bg-gray-200">
      <div className=" flex w-[50%] flex-col  pt-4">
        <h1 className=" px-4 text-xl font-semibold">Define days of work</h1>
        {weekDays.map((day, idx) => {
          return (
            <div
              className="ml-10 flex w-full flex-col items-center"
              key={day.day}
            >
              <div>{idx}</div>
              <div className="flex w-full items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={day.active}
                      name={day.day.toUpperCase()}
                      value={idx}
                      onChange={handleWeekChange}
                    />
                  }
                  label={day.day.toUpperCase()}
                />

                {/* <label htmlFor={day.day}>{day.day.toUpperCase()}</label> */}
              </div>
            </div>
          );
        })}
        <Button onClick={handleCreateSchedule}>Set Working Days</Button>
      </div>
      <div className="flex w-[250px] flex-col gap-4">
        <div>
          <h1>Define Shifts</h1>
        </div>
        {/* <h1>Shift Name</h1> */}
        <FormControl size="small" className="w-fit">
          <TextField
            id="outlined-size-small"
            label="Shift Name"
            variant="outlined"
            size="small"
            type="text"
            className="w-[150px]"
            // onKeyUp={handleWeekNumberChange}
            onChange={handleShiftNameChange}
          />
        </FormControl>
        <FormControl size="small" className="w-fit">
          <TextField
            id="outlined-size-small"
            // label="Start Time"
            variant="outlined"
            size="small"
            type="datetime-local"
            className="w-full"
            // onKeyUp={handleWeekNumberChange}
            onChange={handleStartTimeChange}
          />
        </FormControl>
        <FormControl size="small" className="w-fit">
          <TextField
            id="outlined-size-small"
            // label="End Time"
            variant="outlined"
            size="small"
            type="datetime-local"
            // className="w-[150px]"
            // onKeyUp={handleWeekNumberChange}
            onChange={handleEndTimeChange}
          />
        </FormControl>
        <Button variant="outlined" onClick={handleAddShiftType}>
          Add Shift
        </Button>
      </div>
      <div>
        {shiftsTypes.data &&
          shiftsTypes.data.map((shift) => {
            return (
              <div key={shift.id}>
                {shift.shiftType}
                <h1>
                  {shift.startTime.toLocaleTimeString()} -
                  {shift.endTime.toLocaleTimeString()}
                </h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default index;
