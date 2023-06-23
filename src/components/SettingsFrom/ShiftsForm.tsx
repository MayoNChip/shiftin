"use client";

import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { ShiftType } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { trpc } from "../../utils/trpc";
import FromWrapper from "./FormWrapper";

interface Props {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftType) => void;
}

function ShiftsForm() {
  const shiftsTypes = trpc.scheduleRouter.getAllShiftTypes.useQuery();
  const addShiftType = trpc.scheduleRouter.createShiftType.useMutation();
  const { currentStepIndex, next, steps, step, back } = useMultiStepForm([]);
  const [shiftType, setShiftType] = useState<ShiftType>({
    id: 1,
    shiftType: "",
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleShiftNameChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newShift = { ...shiftType, shiftType: e.target.value };
    setShiftType(newShift);
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = new Date(e.target.value);
    console.log(e.target.value);
    const newShift = { ...shiftType, startTime: selectedTime };
    setShiftType(newShift);
  };
  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = new Date(e.target.value);
    const newShift = { ...shiftType, endTime: selectedTime };
    setShiftType(newShift);
  };
  return (
    <FromWrapper title="Shifts Setup">
      <div className="flex gap-12">
        <FormGroup className="flex  gap-8">
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
          <Button variant="outlined">Add Shift</Button>
        </FormGroup>
        <div>
          {shiftsTypes &&
            shiftsTypes.data?.map((shift) => {
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
    </FromWrapper>
  );
}

export default ShiftsForm;
