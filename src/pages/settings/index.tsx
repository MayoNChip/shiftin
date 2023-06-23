import { Button } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { TRPCClientError } from "@trpc/client";
import { WorkDay } from "@prisma/client";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import WeekForm from "../../components/SettingsFrom/WeekForm";
import ShiftsForm from "../../components/SettingsFrom/ShiftsForm";

// type WeekFormType = typeof weekFormData | null;

function index() {
  const { step, back, next, currentStepIndex } = useMultiStepForm([
    <WeekForm />,
    <ShiftsForm />,
  ]);
  const workDays = trpc.scheduleRouter.getWorkingDays.useQuery();
  const [shiftType, setShiftType] = useState<{
    shiftName: string;
    startTime: string;
    endTime: string;
  }>({ shiftName: "", startTime: "", endTime: "" });

  const scheduleMutation = trpc.scheduleRouter.initialSchdule.useMutation();

  if (!workDays.data) {
    return <>Not good</>;
  }

  // const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!weekDays) {
  //     return;
  //   }
  //   const idx = parseInt(e.currentTarget.value);
  //   const day = weekDays.filter((day, index) => index === idx)[0];
  //   const workDaysArray = [...weekDays];
  //   const dayToUpdate = workDaysArray.filter((day, indx) => indx === idx);
  //   if (day) {
  //     dayToUpdate[0] = { ...day, active: e.currentTarget.checked };
  //     workDaysArray[idx] = dayToUpdate[0];
  //   }
  //   console.log(workDaysArray);
  //   setWeekDays([...workDaysArray]);
  // };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  // const handleAddShiftType = async () => {
  //   const endTime = new Date(shiftType?.endTime);
  //   console.log(endTime);
  //   const startTime = new Date(shiftType?.startTime);
  //   console.log(startTime);

  //   await addShiftType.mutateAsync({
  //     startTime: startTime,
  //     endTime: endTime,
  //     shiftName: shiftType.shiftName,
  //   });

  //   if (addShiftType.isError) {
  //     throw new TRPCClientError("something went wrong");
  //   }
  // };

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

  // const handleCreateSchedule = () => {
  //   if (weekDays.length < 0) {
  //     return;
  //   }
  //   const result = scheduleMutation.mutate(weekDays);
  // };

  return (
    <div className="m-auto mt-6 min-h-[350px] w-[800px] rounded-md bg-gray-200">
      <div className="flex flex-col p-4">
        <form onSubmit={handleFormSubmit} className="flex w-full flex-col">
          {step}
          <div className="mx-auto flex w-1/2 justify-between">
            <Button onClick={back}>Back</Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default index;
