import { Button, FormGroup, useForkRef } from "@mui/material";
import React, { FormEvent } from "react";
import { ShiftType } from "@prisma/client";

import WeekForm from "./WeekForm";
import ShiftsForm from "./ShiftsForm";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";

interface Props {
  shiftsTypes: ShiftType[];
  handleAddShiftType: (shiftType: ShiftType) => void;
}

function SettingsForm({ shiftsTypes, handleAddShiftType }: Props) {
  const { currentStepIndex, next, steps, step, back } = useMultiStepForm([
    <WeekForm />,
    <ShiftsForm />,
  ]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentStepIndex, step);
    next();
  };

  return (
    <div className="flex w-1/2 flex-col items-center border-2 border-slate-500 p-6">
      <form onSubmit={handleSubmitForm}>
        {currentStepIndex}
        {step}
        <div className="flex w-72 items-center justify-around">
          <Button onClick={back}>Back</Button>
          <Button>Next</Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
