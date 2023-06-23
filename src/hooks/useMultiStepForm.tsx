import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const back = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex <= 0 ? prevIndex : prevIndex - 1
    );
  };

  const next = () => {
    console.log("last", currentStepIndex >= steps.length - 1);
    setCurrentStepIndex((prevIndex) =>
      prevIndex >= steps.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    step: steps[currentStepIndex],
    next,
    back,
    goToStep,
  };
}
